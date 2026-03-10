import { getRandomArrayElement } from '../utils';

/* eslint-disable quotes */
export const pointsMocks = [
  {
    "id": "62239668-7447-4342-9fa0-d340dcb5b8d5",
    "base_price": 3086,
    "date_from": "2026-03-01T10:56:04.506Z",
    "date_to": "2026-03-02T07:25:04.506Z",
    "destination": "b641fae0-6a67-42ac-910e-ea22b152d62e",
    "is_favorite": false,
    "offers": [
      "515272d6-4a76-4248-9dcc-634f97b86111",
      "8c4b9cd9-fef2-44db-8d61-daf388ed8c2c"
    ],
    "type": "bus"
  },
  {
    "id": "a9efa72c-423d-4011-aa45-90d8b9ed4056",
    "base_price": 6889,
    "date_from": "2026-03-04T03:43:04.506Z",
    "date_to": "2026-03-04T10:30:04.506Z",
    "destination": "b4f450d6-44d5-420d-be1e-a24bbf4516a1",
    "is_favorite": true,
    "offers": [],
    "type": "drive"
  },
  {
    "id": "3594fb7c-68e2-45ed-80ea-d879dec65995",
    "base_price": 8725,
    "date_from": "2026-03-04T20:27:04.506Z",
    "date_to": "2026-03-06T19:47:04.506Z",
    "destination": "87047be5-3d94-42ee-8401-a1419dd45abf",
    "is_favorite": false,
    "offers": [],
    "type": "sightseeing"
  },
  {
    "id": "8143d114-7790-4d16-b455-15a8c90e31e9",
    "base_price": 6123,
    "date_from": "2026-03-08T07:03:04.506Z",
    "date_to": "2026-03-08T20:32:04.506Z",
    "destination": "7f7f2401-27d7-4969-9736-7c84f65337e5",
    "is_favorite": true,
    "offers": [],
    "type": "train"
  },
  {
    "id": "be30b135-f0dd-4bd9-a880-07d0f07b2cca",
    "base_price": 6348,
    "date_from": "2026-03-10T15:12:04.506Z",
    "date_to": "2026-03-11T01:23:04.506Z",
    "destination": "fd6dcceb-6625-428f-b0d8-31f4ecb2dcc4",
    "is_favorite": false,
    "offers": [
      "dbb05b7b-44bb-49d3-99d7-5e7fc9e19bf6",
      "ce623492-a21a-492b-b6d1-03b016efa4cb"
    ],
    "type": "drive"
  },
  {
    "id": "2f8cb2f3-30ed-4882-846b-fc09bccad60e",
    "base_price": 9013,
    "date_from": "2026-03-12T18:00:04.506Z",
    "date_to": "2026-03-13T01:42:04.506Z",
    "destination": "b641fae0-6a67-42ac-910e-ea22b152d62e",
    "is_favorite": false,
    "offers": [
      "42e59c87-a3a5-43a6-8790-faebd2892b3b",
      "0630a002-7dce-4ad1-be9e-7e8b64152a97"
    ],
    "type": "train"
  },
  {
    "id": "d2d8752d-d3d9-44de-b993-8fa8d38d3adf",
    "base_price": 4353,
    "date_from": "2026-03-13T15:25:04.506Z",
    "date_to": "2026-03-14T21:59:04.506Z",
    "destination": "32a119ce-7ec8-44e3-a7dc-e16c0e63ff25",
    "is_favorite": false,
    "offers": [],
    "type": "sightseeing"
  },
  {
    "id": "16d3d369-9160-404f-904f-f2b30adb4ddd",
    "base_price": 8951,
    "date_from": "2026-03-15T16:28:04.506Z",
    "date_to": "2026-03-16T08:47:04.506Z",
    "destination": "7f7f2401-27d7-4969-9736-7c84f65337e5",
    "is_favorite": false,
    "offers": [
      "515272d6-4a76-4248-9dcc-634f97b86111",
      "8c4b9cd9-fef2-44db-8d61-daf388ed8c2c"
    ],
    "type": "bus"
  },
  {
    "id": "158b726b-94fd-48ff-a3fe-47c690a8ae71",
    "base_price": 1091,
    "date_from": "2026-03-17T13:26:04.506Z",
    "date_to": "2026-03-19T05:50:04.506Z",
    "destination": "c4586880-c31c-45b2-8ef1-9cb807038ef0",
    "is_favorite": true,
    "offers": [
      "8267a6b8-1f08-4bc8-a298-d6eb34417ad3",
      "42e59c87-a3a5-43a6-8790-faebd2892b3b",
      "0630a002-7dce-4ad1-be9e-7e8b64152a97"
    ],
    "type": "train"
  },
  {
    "id": "21c2a15a-b49a-487e-9f61-358b3da3d62b",
    "base_price": 6353,
    "date_from": "2026-03-20T12:04:04.506Z",
    "date_to": "2026-03-22T00:34:04.506Z",
    "destination": "7f7f2401-27d7-4969-9736-7c84f65337e5",
    "is_favorite": true,
    "offers": [],
    "type": "train"
  },
  {
    "id": "d4224133-79fb-445d-8eb2-156f0e341b0a",
    "base_price": 1060,
    "date_from": "2026-03-22T20:04:04.506Z",
    "date_to": "2026-03-24T13:20:04.506Z",
    "destination": "b4f450d6-44d5-420d-be1e-a24bbf4516a1",
    "is_favorite": true,
    "offers": [
      "8e3040de-2478-474f-b61d-a8414934a824",
      "56221ee4-0112-4fe2-a3fd-bae34d18282b"
    ],
    "type": "ship"
  },
  {
    "id": "45cc07fe-1918-4676-b0e5-e297ef82c553",
    "base_price": 955,
    "date_from": "2026-03-26T01:08:04.506Z",
    "date_to": "2026-03-27T10:03:04.506Z",
    "destination": "87047be5-3d94-42ee-8401-a1419dd45abf",
    "is_favorite": true,
    "offers": [
      "e1f59ff7-054a-4852-bd18-72a562f4cdec",
      "90a75790-ad6e-43f2-8fc3-cec5727b9432"
    ],
    "type": "restaurant"
  },
  {
    "id": "099661ef-696b-407e-b6ab-eeadf52ddfa4",
    "base_price": 7659,
    "date_from": "2026-03-28T05:45:04.506Z",
    "date_to": "2026-03-29T13:32:04.506Z",
    "destination": "f938701f-6c0c-4404-b46c-60134a8cf73f",
    "is_favorite": false,
    "offers": [
      "7a74643a-173b-4cc6-90ff-cf3e7cc7cef5",
      "bfe7c32e-e1a8-4ff9-9629-921e3958369a"
    ],
    "type": "taxi"
  },
  {
    "id": "15e887a4-9671-4e39-9d62-dc458d35a00d",
    "base_price": 6748,
    "date_from": "2026-03-30T16:56:04.506Z",
    "date_to": "2026-04-01T02:54:04.506Z",
    "destination": "7f7f2401-27d7-4969-9736-7c84f65337e5",
    "is_favorite": true,
    "offers": [
      "21e8fecf-2cf7-472a-846b-75d8787d64c9",
      "77ca1839-c4ba-44e6-ab5f-85a37f097b1c",
      "059efaf8-3db3-41b4-a4ad-1c6764f23604",
      "7a74643a-173b-4cc6-90ff-cf3e7cc7cef5",
      "bfe7c32e-e1a8-4ff9-9629-921e3958369a"
    ],
    "type": "taxi"
  },
  {
    "id": "58061e3d-e4cf-4634-9b47-e6039d75df53",
    "base_price": 474,
    "date_from": "2026-04-01T15:03:04.506Z",
    "date_to": "2026-04-02T02:54:04.506Z",
    "destination": "c4586880-c31c-45b2-8ef1-9cb807038ef0",
    "is_favorite": true,
    "offers": [
      "515272d6-4a76-4248-9dcc-634f97b86111",
      "8c4b9cd9-fef2-44db-8d61-daf388ed8c2c"
    ],
    "type": "bus"
  },
  {
    "id": "639a6937-08f8-46f7-a837-06720d7a2c7d",
    "base_price": 1013,
    "date_from": "2026-04-03T11:21:04.506Z",
    "date_to": "2026-04-04T19:27:04.506Z",
    "destination": "c4586880-c31c-45b2-8ef1-9cb807038ef0",
    "is_favorite": false,
    "offers": [
      "e1f59ff7-054a-4852-bd18-72a562f4cdec",
      "90a75790-ad6e-43f2-8fc3-cec5727b9432"
    ],
    "type": "restaurant"
  },
  {
    "id": "6a5194dc-549e-44f5-af6a-5a34a082aa7c",
    "base_price": 9216,
    "date_from": "2026-04-05T19:12:04.506Z",
    "date_to": "2026-04-07T01:24:04.506Z",
    "destination": "b4f450d6-44d5-420d-be1e-a24bbf4516a1",
    "is_favorite": false,
    "offers": [],
    "type": "bus"
  },
  {
    "id": "7e305b70-07da-4b2b-ac2c-03e4681f9019",
    "base_price": 4518,
    "date_from": "2026-04-08T11:04:04.506Z",
    "date_to": "2026-04-10T07:06:04.506Z",
    "destination": "87047be5-3d94-42ee-8401-a1419dd45abf",
    "is_favorite": true,
    "offers": [
      "3b0020db-4d7d-41e0-8d08-f2a953063c88",
      "5e100612-fcf0-4a4e-ab19-d1432481520c",
      "91f9c54d-7980-49dc-a3dd-782e6fc4c522",
      "71624f8a-de35-49d6-a96b-866f3775a71a"
    ],
    "type": "check-in"
  },
  {
    "id": "ad43ac44-3032-49cd-8470-5658d3c26379",
    "base_price": 1105,
    "date_from": "2026-04-10T20:53:04.506Z",
    "date_to": "2026-04-11T19:26:04.506Z",
    "destination": "32a119ce-7ec8-44e3-a7dc-e16c0e63ff25",
    "is_favorite": true,
    "offers": [],
    "type": "bus"
  },
  {
    "id": "3fa36672-9181-4113-96f8-55030607f55b",
    "base_price": 4880,
    "date_from": "2026-04-12T15:45:04.506Z",
    "date_to": "2026-04-14T05:29:04.506Z",
    "destination": "b641fae0-6a67-42ac-910e-ea22b152d62e",
    "is_favorite": true,
    "offers": [],
    "type": "sightseeing"
  },
  {
    "id": "f952d7b1-c6d5-4cbf-811f-9e3297cddc63",
    "base_price": 4057,
    "date_from": "2026-04-14T23:26:04.506Z",
    "date_to": "2026-04-15T21:20:04.506Z",
    "destination": "b641fae0-6a67-42ac-910e-ea22b152d62e",
    "is_favorite": true,
    "offers": [],
    "type": "sightseeing"
  },
  {
    "id": "56e27dd3-972d-437a-a725-c9b1e6d67264",
    "base_price": 2629,
    "date_from": "2026-04-16T14:25:04.506Z",
    "date_to": "2026-04-17T22:16:04.506Z",
    "destination": "32a119ce-7ec8-44e3-a7dc-e16c0e63ff25",
    "is_favorite": false,
    "offers": [
      "42e59c87-a3a5-43a6-8790-faebd2892b3b",
      "0630a002-7dce-4ad1-be9e-7e8b64152a97"
    ],
    "type": "train"
  },
  {
    "id": "bfae8e2b-7ce0-491b-9095-a5b9405307f4",
    "base_price": 2885,
    "date_from": "2026-04-18T09:58:04.506Z",
    "date_to": "2026-04-20T03:18:04.506Z",
    "destination": "32a119ce-7ec8-44e3-a7dc-e16c0e63ff25",
    "is_favorite": true,
    "offers": [
      "77ca1839-c4ba-44e6-ab5f-85a37f097b1c",
      "059efaf8-3db3-41b4-a4ad-1c6764f23604",
      "7a74643a-173b-4cc6-90ff-cf3e7cc7cef5",
      "bfe7c32e-e1a8-4ff9-9629-921e3958369a"
    ],
    "type": "taxi"
  },
  {
    "id": "b2802266-8914-401f-8644-1cb5ec894fcd",
    "base_price": 3472,
    "date_from": "2026-04-21T06:26:04.506Z",
    "date_to": "2026-04-22T20:56:04.506Z",
    "destination": "b4f450d6-44d5-420d-be1e-a24bbf4516a1",
    "is_favorite": true,
    "offers": [],
    "type": "sightseeing"
  },
  {
    "id": "8cd125c7-0fa8-410d-86db-ccbdb0995d22",
    "base_price": 8134,
    "date_from": "2026-04-24T05:10:04.506Z",
    "date_to": "2026-04-24T18:43:04.506Z",
    "destination": "6b2fb21b-bbf2-40af-95b3-10f43728b69f",
    "is_favorite": true,
    "offers": [
      "8c4b9cd9-fef2-44db-8d61-daf388ed8c2c"
    ],
    "type": "bus"
  }
];

export const getRandomPoint = () => getRandomArrayElement(pointsMocks);
