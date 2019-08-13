/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

package pluginimpl

import (
	"net/http"

	"magma/orc8r/cloud/go/errors"
	models1 "magma/orc8r/cloud/go/models"
	"magma/orc8r/cloud/go/obsidian"
	"magma/orc8r/cloud/go/orc8r"
	"magma/orc8r/cloud/go/pluginimpl/handlers"
	"magma/orc8r/cloud/go/pluginimpl/models"
	"magma/orc8r/cloud/go/services/configurator"

	"github.com/go-openapi/strfmt"
	"github.com/labstack/echo"
)

const (
	Networks                     = "networks"
	ListNetworksPath             = obsidian.V1Root + Networks
	RegisterNetworkPath          = obsidian.V1Root + Networks
	ManageNetworkPath            = obsidian.V1Root + Networks + "/:network_id"
	ManageNetworkNamePath        = ManageNetworkPath + obsidian.UrlSep + "name"
	ManageNetworkTypePath        = ManageNetworkPath + obsidian.UrlSep + "type"
	ManageNetworkDescriptionPath = ManageNetworkPath + obsidian.UrlSep + "description"
	ManageNetworkFeaturesPath    = ManageNetworkPath + obsidian.UrlSep + "features"
	ManageNetworkDNSPath         = ManageNetworkPath + obsidian.UrlSep + "dns"
)

// GetObsidianHandlers returns all obsidian handlers for configurator
func GetObsidianHandlers() []obsidian.Handler {
	ret := []obsidian.Handler{
		// Magma V1 Network
		{Path: ListNetworksPath, Methods: obsidian.GET, HandlerFunc: ListNetworks},
		{Path: RegisterNetworkPath, Methods: obsidian.POST, HandlerFunc: RegisterNetwork},
		{Path: ManageNetworkPath, Methods: obsidian.GET, HandlerFunc: GetNetwork},
		{Path: ManageNetworkPath, Methods: obsidian.PUT, HandlerFunc: UpdateNetwork},
		{Path: ManageNetworkPath, Methods: obsidian.DELETE, HandlerFunc: DeleteNetwork},
	}
	ret = append(ret, handlers.GetPartialNetworkHandlers(ManageNetworkNamePath, new(models1.NetworkName), "")...)
	ret = append(ret, handlers.GetPartialNetworkHandlers(ManageNetworkTypePath, new(models1.NetworkType), "")...)
	ret = append(ret, handlers.GetPartialNetworkHandlers(ManageNetworkDescriptionPath, new(models1.NetworkDescription), "")...)
	ret = append(ret, handlers.GetPartialNetworkHandlers(ManageNetworkFeaturesPath, &models.NetworkFeatures{}, orc8r.NetworkFeaturesConfig)...)
	ret = append(ret, handlers.GetPartialNetworkHandlers(ManageNetworkDNSPath, &models.NetworkDNSConfig{}, orc8r.DnsdNetworkType)...)
	return ret
}

func ListNetworks(c echo.Context) error {
	networks, err := configurator.ListNetworkIDs()
	if err != nil {
		return obsidian.HttpError(err, http.StatusInternalServerError)
	}
	if networks == nil {
		networks = []string{}
	}
	return c.JSON(http.StatusOK, networks)
}

func RegisterNetwork(c echo.Context) error {
	swaggerNetwork := &models.Network{}
	err := c.Bind(&swaggerNetwork)
	if err != nil {
		return obsidian.HttpError(err, http.StatusBadRequest)
	}
	if err := swaggerNetwork.Validate(strfmt.Default); err != nil {
		return obsidian.HttpError(err, http.StatusBadRequest)
	}

	network := swaggerNetwork.ToConfiguratorNetwork()
	createdNetworks, err := configurator.CreateNetworks([]configurator.Network{network})
	if err != nil {
		return obsidian.HttpError(err, http.StatusBadRequest)
	}
	return c.JSON(http.StatusCreated, createdNetworks[0].ID)
}

func GetNetwork(c echo.Context) error {
	networkID, nerr := obsidian.GetNetworkId(c)
	if nerr != nil {
		return nerr
	}
	network, err := configurator.LoadNetwork(networkID, true, true)
	if err == errors.ErrNotFound {
		return obsidian.HttpError(err, http.StatusNotFound)
	}
	if err != nil {
		return obsidian.HttpError(err, http.StatusInternalServerError)
	}
	ret := (&models.Network{}).FromConfiguratorNetwork(network)
	return c.JSON(http.StatusOK, ret)
}

func UpdateNetwork(c echo.Context) error {
	// Bind network record from swagger
	swaggerNetwork := &models.Network{}
	err := c.Bind(&swaggerNetwork)
	if err != nil {
		return obsidian.HttpError(err, http.StatusBadRequest)
	}
	if err := swaggerNetwork.Validate(strfmt.Default); err != nil {
		return obsidian.HttpError(err, http.StatusBadRequest)
	}
	update := swaggerNetwork.ToUpdateCriteria()
	err = configurator.UpdateNetworks([]configurator.NetworkUpdateCriteria{update})
	if err != nil {
		return obsidian.HttpError(err, http.StatusInternalServerError)
	}
	return c.NoContent(http.StatusNoContent)
}

func DeleteNetwork(c echo.Context) error {
	networkID, nerr := obsidian.GetNetworkId(c)
	if nerr != nil {
		return nerr
	}
	err := configurator.DeleteNetwork(networkID)
	if err != nil {
		return obsidian.HttpError(err, http.StatusInternalServerError)
	}
	return c.NoContent(http.StatusNoContent)
}
