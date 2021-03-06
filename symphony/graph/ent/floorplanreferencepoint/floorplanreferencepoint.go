// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated (@generated) by entc, DO NOT EDIT.

package floorplanreferencepoint

import (
	"time"

	"github.com/facebookincubator/ent"
	"github.com/facebookincubator/symphony/graph/ent/schema"
)

const (
	// Label holds the string label denoting the floorplanreferencepoint type in the database.
	Label = "floor_plan_reference_point"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldCreateTime holds the string denoting the create_time vertex property in the database.
	FieldCreateTime = "create_time"
	// FieldUpdateTime holds the string denoting the update_time vertex property in the database.
	FieldUpdateTime = "update_time"
	// FieldX holds the string denoting the x vertex property in the database.
	FieldX = "x"
	// FieldY holds the string denoting the y vertex property in the database.
	FieldY = "y"
	// FieldLatitude holds the string denoting the latitude vertex property in the database.
	FieldLatitude = "latitude"
	// FieldLongitude holds the string denoting the longitude vertex property in the database.
	FieldLongitude = "longitude"

	// Table holds the table name of the floorplanreferencepoint in the database.
	Table = "floor_plan_reference_points"
)

// Columns holds all SQL columns are floorplanreferencepoint fields.
var Columns = []string{
	FieldID,
	FieldCreateTime,
	FieldUpdateTime,
	FieldX,
	FieldY,
	FieldLatitude,
	FieldLongitude,
}

var (
	mixin       = schema.FloorPlanReferencePoint{}.Mixin()
	mixinFields = [...][]ent.Field{
		mixin[0].Fields(),
	}
	fields = schema.FloorPlanReferencePoint{}.Fields()

	// descCreateTime is the schema descriptor for create_time field.
	descCreateTime = mixinFields[0][0].Descriptor()
	// DefaultCreateTime holds the default value on creation for the create_time field.
	DefaultCreateTime = descCreateTime.Default.(func() time.Time)

	// descUpdateTime is the schema descriptor for update_time field.
	descUpdateTime = mixinFields[0][1].Descriptor()
	// DefaultUpdateTime holds the default value on creation for the update_time field.
	DefaultUpdateTime = descUpdateTime.Default.(func() time.Time)
	// UpdateDefaultUpdateTime holds the default value on update for the update_time field.
	UpdateDefaultUpdateTime = descUpdateTime.UpdateDefault.(func() time.Time)
)
