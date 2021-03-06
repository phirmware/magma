/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {ContextRouter} from 'react-router-dom';
import type {EquipmentPosition} from '../common/Equipment';
import type {EquipmentType} from '../common/EquipmentType';
import type {Location} from '../common/Location';
import type {LocationType} from '../common/LocationType';
import type {WithAlert} from '@fbcnms/ui/components/Alert/withAlert';
import type {WithStyles} from '@material-ui/core';

import AddToLocationDialog from '../components/AddToLocationDialog';
import EquipmentCard from '../components/EquipmentCard';
import InventoryErrorBoundary from '../common/InventoryErrorBoundary';
import InventoryTopBar from '../components/InventoryTopBar';
import LocationCard from '../components/LocationCard';
import LocationsTree from '../components/LocationsTree';
import React from 'react';
import withAlert from '@fbcnms/ui/components/Alert/withAlert';
import {LogEvents, ServerLogger} from '../common/LoggingUtils';
import {extractEntityIdFromUrl} from '../common/RouterUtils';
import {withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  tree: {
    maxWidth: '',
  },
  addBtn: {
    position: 'absolute',
    bottom: '61px',
    right: '61px',
  },
  gridContainer: {
    display: 'flex',
    height: 'calc(100% - 60px)',
    flexWrap: 'nowrap',
  },
  propertiesCard: {
    padding: '20px 16px',
    height: '100%',
    flexGrow: 1,
    minWidth: '75%',
  },
  tabsContainer: {
    padding: '20px',
  },
};

const ADD_LOCATION_CARD: Card = {mode: 'add', type: 'location'};
const ADD_EQUIPMENT_CARD: Card = {mode: 'add', type: 'equipment'};
const EDIT_LOCATION_CARD: Card = {mode: 'edit', type: 'location'};
const EDIT_EQUIPMENT_CARD: Card = {mode: 'edit', type: 'equipment'};
const SHOW_LOCATION_CARD: Card = {mode: 'show', type: 'location'};
const SHOW_EQUIPMENT_CARD: Card = {mode: 'show', type: 'equipment'};

type Card = {
  mode: 'add' | 'edit' | 'show',
  type: 'location' | 'equipment',
};

type Props = ContextRouter & WithStyles<typeof styles> & WithAlert & {};

type State = {
  card: Card,
  dialogMode: 'hidden' | 'location' | 'equipment',
  errorMessage: ?string,
  parentLocationId: ?string,
  selectedEquipmentId: ?string,
  selectedEquipmentPosition: ?EquipmentPosition,
  selectedEquipmentType: ?EquipmentType,
  selectedLocationId: ?string,
  selectedLocationType: ?LocationType,
  selectedWorkOrderId: ?string,
  openLocationHierarchy: Array<string>,
};

class Inventory extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const selectedLocationId = extractEntityIdFromUrl(
      'location',
      props.location.search,
    );
    const selectedEquipmentId = extractEntityIdFromUrl(
      'equipment',
      props.location.search,
    );
    let card = SHOW_LOCATION_CARD;
    if (selectedEquipmentId) {
      card = SHOW_EQUIPMENT_CARD;
    }
    this.state = {
      card: card,
      dialogMode: 'hidden',
      errorMessage: null,
      parentLocationId: null,
      selectedEquipmentId,
      selectedEquipmentPosition: null,
      selectedEquipmentType: null,
      selectedLocationId,
      selectedLocationType: null,
      selectedWorkOrderId: null,
      openLocationHierarchy: [],
    };
  }

  navigateToLocation(selectedLocationId: ?string, source: ?string) {
    ServerLogger.info(LogEvents.NAVIGATE_TO_LOCATION, {
      locationId: selectedLocationId,
      source,
    });

    const {match} = this.props;
    this.props.history.push(
      `${match.url}` +
        (selectedLocationId ? `?location=${selectedLocationId}` : ''),
    );
    this.setState({
      card: SHOW_LOCATION_CARD,
      selectedLocationId,
      selectedEquipmentId: null,
      selectedEquipmentPosition: null,
    });
  }

  navigateToEquipment(selectedEquipmentId: ?string, source: ?string) {
    ServerLogger.info(LogEvents.NAVIGATE_TO_EQUIPMENT, {
      equipmentId: selectedEquipmentId,
      source,
    });
    const {match} = this.props;
    this.props.history.push(
      `${match.url}` +
        (selectedEquipmentId ? `?equipment=${selectedEquipmentId}` : ''),
    );
    this.setState({
      card: SHOW_EQUIPMENT_CARD,
      selectedEquipmentId,
      selectedLocationId: null,
      selectedEquipmentPosition: null,
    });
  }

  navigateToWorkOrder(selectedWorkOrderCardId: ?string) {
    const {history} = this.props;
    if (selectedWorkOrderCardId) {
      history.push(`/workorders/search?workorder=${selectedWorkOrderCardId}`);
    }
  }

  render() {
    const {classes} = this.props;
    const {card} = this.state;
    return (
      <>
        <InventoryTopBar
          onWorkOrderSelected={selectedWorkOrderId =>
            this.setState({selectedWorkOrderId})
          }
          onSearchEntitySelected={(entityId, entityType) => {
            switch (entityType) {
              case 'location':
                this.navigateToLocation(entityId, 'goto_search');
                break;
              case 'equipment':
                this.navigateToEquipment(entityId, 'goto_search');
                break;
            }
          }}
          onNavigateToWorkOrder={selectedWorkOrderCardId =>
            this.navigateToWorkOrder(selectedWorkOrderCardId)
          }
        />
        <div className={classes.gridContainer}>
          <LocationsTree
            selectedLocationId={this.state.selectedLocationId}
            onSelect={selectedLocationId =>
              this.navigateToLocation(selectedLocationId, 'tree')
            }
            onAddLocation={(parentLocation: ?Location) =>
              this.setState({parentLocationId: parentLocation?.id}, () =>
                this.showDialog('location'),
              )
            }
          />
          <div className={classes.propertiesCard}>
            <InventoryErrorBoundary>
              {card.type == 'location' && (
                <LocationCard
                  mode={card.mode}
                  onEdit={this.onLocationEdit}
                  onSave={this.onLocationSave}
                  onCancel={this.onLocationCancel}
                  parentLocationId={this.state.parentLocationId}
                  selectedLocationId={this.state.selectedLocationId}
                  selectedLocationType={this.state.selectedLocationType}
                  selectedWorkOrderId={this.state.selectedWorkOrderId}
                  onEquipmentSelected={selectedEquipment =>
                    this.navigateToEquipment(selectedEquipment.id)
                  }
                  onWorkOrderSelected={selectedWorkOrderCardId =>
                    this.navigateToWorkOrder(selectedWorkOrderCardId)
                  }
                  onAddEquipment={() => this.showDialog('equipment')}
                  onLocationRemoved={this.onDeleteLocation}
                  onLocationSelected={selectedLocationId =>
                    this.navigateToLocation(selectedLocationId)
                  }
                />
              )}
              {card.type == 'equipment' && (
                <EquipmentCard
                  mode={card.mode}
                  onSave={this.onEquipmentSave}
                  onEdit={this.onEquipmentEdit}
                  onCancel={this.onEquipmentCancel}
                  selectedEquipmentId={this.state.selectedEquipmentId}
                  selectedEquipmentPosition={
                    this.state.selectedEquipmentPosition
                  }
                  selectedLocationId={this.state.selectedLocationId}
                  selectedEquipmentType={this.state.selectedEquipmentType}
                  selectedWorkOrderId={this.state.selectedWorkOrderId}
                  onAttachingEquipmentToPosition={(
                    selectedEquipmentType,
                    selectedEquipmentPosition,
                  ) => {
                    ServerLogger.info(
                      LogEvents.ATTACH_EQUIPMENT_TO_POSITION_CLICKED,
                    );
                    this.setState({
                      selectedEquipmentType,
                      selectedEquipmentPosition,
                      card: ADD_EQUIPMENT_CARD,
                      dialogMode: 'hidden',
                    });
                  }}
                  onEquipmentClicked={equipmentId =>
                    this.navigateToEquipment(equipmentId)
                  }
                  onParentLocationClicked={selectedLocationId => {
                    this.navigateToLocation(selectedLocationId);
                  }}
                  onWorkOrderSelected={selectedWorkOrderCardId =>
                    this.navigateToWorkOrder(selectedWorkOrderCardId)
                  }
                />
              )}
            </InventoryErrorBoundary>
          </div>
        </div>
        <AddToLocationDialog
          key={`add_to_location_${this.state.dialogMode}`}
          show={
            this.state.dialogMode === 'hidden'
              ? 'location'
              : this.state.dialogMode
          }
          open={this.state.dialogMode !== 'hidden'}
          onClose={this.hideDialog}
          onEquipmentTypeSelected={selectedEquipmentType =>
            this.setState({
              selectedEquipmentType,
              card: ADD_EQUIPMENT_CARD,
              dialogMode: 'hidden',
            })
          }
          onLocationTypeSelected={selectedLocationType =>
            this.setState({
              selectedLocationType,
              card: ADD_LOCATION_CARD,
              dialogMode: 'hidden',
            })
          }
        />
      </>
    );
  }

  showDialog = (dialogMode: 'location' | 'equipment') => {
    ServerLogger.info(
      dialogMode === 'location'
        ? LogEvents.ADD_LOCATION_BUTTON_CLICKED
        : LogEvents.ADD_EQUIPMENT_BUTTON_CLICKED,
    );
    this.setState({dialogMode});
  };
  hideDialog = () => this.setState({dialogMode: 'hidden'});

  onEquipmentCancel = () => {
    this.setState(state => ({
      card: state.selectedEquipmentId
        ? SHOW_EQUIPMENT_CARD
        : SHOW_LOCATION_CARD,
    }));
  };

  onEquipmentSave = () => {
    ServerLogger.info(LogEvents.SAVE_EQUIPMENT_BUTTON_CLICKED);
    if (this.state.selectedEquipmentId) {
      this.navigateToEquipment(this.state.selectedEquipmentId);
    } else if (this.state.selectedEquipmentPosition) {
      this.navigateToEquipment(
        this.state.selectedEquipmentPosition.parentEquipment.id,
      );
    } else {
      this.navigateToLocation(this.state.selectedLocationId);
    }
  };

  onEquipmentEdit = () => {
    ServerLogger.info(LogEvents.EDIT_EQUIPMENT_BUTTON_CLICKED);
    this.setState({
      card: EDIT_EQUIPMENT_CARD,
    });
  };

  onLocationCancel = () => {
    ServerLogger.info(LogEvents.LOCATION_CARD_CANCEL_BUTTON_CLICKED);
    this.setState(state => ({
      card: state.selectedEquipmentId
        ? SHOW_EQUIPMENT_CARD
        : SHOW_LOCATION_CARD,
    }));
  };

  onLocationEdit = () => {
    ServerLogger.info(LogEvents.EDIT_LOCATION_BUTTON_CLICKED);
    this.setState({
      card: EDIT_LOCATION_CARD,
    });
  };

  onLocationSave = (newLocationId: string) => {
    ServerLogger.info(LogEvents.SAVE_LOCATION_BUTTON_CLICKED);
    this.setState({
      selectedLocationId: newLocationId,
      card: SHOW_LOCATION_CARD,
    });
  };

  onDeleteLocation = () => {
    ServerLogger.info(LogEvents.DELETE_LOCATION_BUTTON_CLICKED);
    this.navigateToLocation(null);
    this.props.alert('Location removed successfuly');
  };
}

export default withStyles(styles)(withRouter(withAlert(Inventory)));
