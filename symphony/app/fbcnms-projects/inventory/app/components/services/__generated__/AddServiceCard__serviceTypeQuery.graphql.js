/**
 * @generated
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 **/

 /**
 * @flow
 * @relayHash bf88ae1e637af3956ea926384251bdef
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type PropertyKind = "bool" | "date" | "email" | "enum" | "equipment" | "float" | "gps_location" | "int" | "location" | "range" | "string" | "%future added value";
export type AddServiceCard__serviceTypeQueryVariables = {|
  serviceTypeId: string
|};
export type AddServiceCard__serviceTypeQueryResponse = {|
  +serviceType: ?{|
    +id: string,
    +name: string,
    +propertyTypes: $ReadOnlyArray<?{|
      +id: string,
      +name: string,
      +type: PropertyKind,
      +index: ?number,
      +stringValue: ?string,
      +intValue: ?number,
      +booleanValue: ?boolean,
      +floatValue: ?number,
      +latitudeValue: ?number,
      +longitudeValue: ?number,
      +rangeFromValue: ?number,
      +rangeToValue: ?number,
      +isEditable: ?boolean,
      +isInstanceProperty: ?boolean,
    |}>,
  |}
|};
export type AddServiceCard__serviceTypeQuery = {|
  variables: AddServiceCard__serviceTypeQueryVariables,
  response: AddServiceCard__serviceTypeQueryResponse,
|};
*/


/*
query AddServiceCard__serviceTypeQuery(
  $serviceTypeId: ID!
) {
  serviceType(id: $serviceTypeId) {
    id
    name
    propertyTypes {
      id
      name
      type
      index
      stringValue
      intValue
      booleanValue
      floatValue
      latitudeValue
      longitudeValue
      rangeFromValue
      rangeToValue
      isEditable
      isInstanceProperty
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "serviceTypeId",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "serviceType",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "serviceTypeId"
      }
    ],
    "concreteType": "ServiceType",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "propertyTypes",
        "storageKey": null,
        "args": null,
        "concreteType": "PropertyType",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "type",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "index",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "stringValue",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "intValue",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "booleanValue",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "floatValue",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "latitudeValue",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "longitudeValue",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "rangeFromValue",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "rangeToValue",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "isEditable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "isInstanceProperty",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AddServiceCard__serviceTypeQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v3/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "AddServiceCard__serviceTypeQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v3/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "AddServiceCard__serviceTypeQuery",
    "id": null,
    "text": "query AddServiceCard__serviceTypeQuery(\n  $serviceTypeId: ID!\n) {\n  serviceType(id: $serviceTypeId) {\n    id\n    name\n    propertyTypes {\n      id\n      name\n      type\n      index\n      stringValue\n      intValue\n      booleanValue\n      floatValue\n      latitudeValue\n      longitudeValue\n      rangeFromValue\n      rangeToValue\n      isEditable\n      isInstanceProperty\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '381eb9332c2bd4340b0b29b57a922a48';
module.exports = node;
