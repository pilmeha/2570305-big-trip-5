import { getRandomArrayElement } from '../utils';

/* eslint-disable quotes */
export const pointsMocks = [
  {
    "id": "0c86853d-0111-4f15-80d2-74db902f9a8d",
    "base_price": 9741,
    "date_from": "2026-04-27T14:42:05.804Z",
    "date_to": "2026-04-28T21:03:05.804Z",
    "destination": "9a19e8ca-b32b-4841-9212-2780884ecb8e",
    "is_favorite": false,
    "offers": [
      "412fdb97-c1d8-4f49-96d1-c214bcf5996b"
    ],
    "type": "check-in"
  },
  {
    "id": "e4bf577b-d595-4cd9-94fb-951f58028faa",
    "base_price": 464,
    "date_from": "2026-04-30T21:42:05.804Z",
    "date_to": "2026-05-02T00:21:05.804Z",
    "destination": "ab819382-4d59-4589-a496-fc1c891efd8f",
    "is_favorite": false,
    "offers": [
      "5d84bdc8-939f-4d1e-a3b9-8eb4a65c067b",
      "fbc1763e-7353-42b2-9b68-8ea80a155685",
      "7f5db014-abf0-4851-a1f2-6a1efb6a2043"
    ],
    "type": "taxi"
  },
  {
    "id": "b1886213-008a-420b-81a5-7b3817c840c6",
    "base_price": 2001,
    "date_from": "2026-05-03T19:10:05.804Z",
    "date_to": "2026-05-04T11:05:05.804Z",
    "destination": "9d533531-6395-48e2-b067-d82c9cf0d237",
    "is_favorite": false,
    "offers": [
      "26f2e6d7-6e22-4389-89c1-d484f234712d"
    ],
    "type": "train"
  },
  {
    "id": "74f1808a-3d2a-4fec-a2fb-0d8afe4bbd43",
    "base_price": 5773,
    "date_from": "2026-05-05T10:57:05.804Z",
    "date_to": "2026-05-05T18:20:05.804Z",
    "destination": "0730f4e2-3644-4055-9339-1c000a3a2a7b",
    "is_favorite": false,
    "offers": [
      "065ea93c-349a-4943-a927-eef188423294",
      "5533fec5-f2e6-46ca-a5e8-17ccc2cccc8f",
      "19f63e21-5fb8-4b1d-945b-a2227093ea8b"
    ],
    "type": "flight"
  },
  {
    "id": "f7c962d3-1a0d-410c-bf6e-044e862ab1f1",
    "base_price": 5174,
    "date_from": "2026-05-07T03:37:05.804Z",
    "date_to": "2026-05-07T10:15:05.804Z",
    "destination": "9d533531-6395-48e2-b067-d82c9cf0d237",
    "is_favorite": false,
    "offers": [],
    "type": "train"
  },
  {
    "id": "4ec03b99-74da-4edf-89ff-ef10bba29956",
    "base_price": 5963,
    "date_from": "2026-05-07T17:51:05.804Z",
    "date_to": "2026-05-08T10:46:05.804Z",
    "destination": "ab819382-4d59-4589-a496-fc1c891efd8f",
    "is_favorite": false,
    "offers": [],
    "type": "drive"
  },
  {
    "id": "826bb1bd-f169-4668-a550-81fdd44da0b4",
    "base_price": 3687,
    "date_from": "2026-05-09T19:32:05.804Z",
    "date_to": "2026-05-10T23:01:05.804Z",
    "destination": "9a19e8ca-b32b-4841-9212-2780884ecb8e",
    "is_favorite": true,
    "offers": [
      "fbc1763e-7353-42b2-9b68-8ea80a155685",
      "7f5db014-abf0-4851-a1f2-6a1efb6a2043"
    ],
    "type": "taxi"
  },
  {
    "id": "c517e306-d438-4d11-a609-6bffa6af8b26",
    "base_price": 2600,
    "date_from": "2026-05-12T22:26:05.804Z",
    "date_to": "2026-05-13T10:58:05.804Z",
    "destination": "c928b356-6eac-45bc-8456-9200c8219546",
    "is_favorite": true,
    "offers": [
      "ce327ebf-48ee-4995-ad1b-4494b20c78d5",
      "dba30fea-fcf8-4dba-995e-c0305f4d5547",
      "26f2e6d7-6e22-4389-89c1-d484f234712d"
    ],
    "type": "train"
  },
  {
    "id": "8fad70ac-c8b1-4d94-b05c-a0720a4b5d88",
    "base_price": 4041,
    "date_from": "2026-05-14T13:56:05.804Z",
    "date_to": "2026-05-14T21:38:05.804Z",
    "destination": "ab819382-4d59-4589-a496-fc1c891efd8f",
    "is_favorite": true,
    "offers": [
      "e9c52c80-06d4-492f-be22-81878e920c4f",
      "1033c209-71b7-42af-890a-da3ed17f423a",
      "9f1af2f1-000d-4a38-a2d4-b9d21345193c"
    ],
    "type": "ship"
  },
  {
    "id": "4185654e-cfe3-4c8a-b96e-882968b5118d",
    "base_price": 1953,
    "date_from": "2026-05-15T16:47:05.804Z",
    "date_to": "2026-05-17T12:15:05.804Z",
    "destination": "ab819382-4d59-4589-a496-fc1c891efd8f",
    "is_favorite": true,
    "offers": [
      "4b5149e7-ab5a-4434-abdb-500112272991",
      "28410a50-fc2d-4c50-a03f-3d34957002b8",
      "61fccdfd-7ce0-4d7c-9d9c-0d6ccdbd2955",
      "e9c52c80-06d4-492f-be22-81878e920c4f",
      "1033c209-71b7-42af-890a-da3ed17f423a",
      "9f1af2f1-000d-4a38-a2d4-b9d21345193c"
    ],
    "type": "ship"
  },
  {
    "id": "019b7992-3d2a-4294-b2ce-53d9569cfceb",
    "base_price": 9940,
    "date_from": "2026-05-19T10:33:05.804Z",
    "date_to": "2026-05-20T07:25:05.804Z",
    "destination": "9a19e8ca-b32b-4841-9212-2780884ecb8e",
    "is_favorite": true,
    "offers": [],
    "type": "sightseeing"
  },
  {
    "id": "6568f7d7-27c3-4b3a-8963-14557d82c056",
    "base_price": 9310,
    "date_from": "2026-05-21T11:18:05.804Z",
    "date_to": "2026-05-23T10:01:05.804Z",
    "destination": "634287d2-8b83-45d4-b0f5-6398ddf36ece",
    "is_favorite": true,
    "offers": [
      "cd66da33-76a9-4f27-86ac-783b61ec55a1",
      "065ea93c-349a-4943-a927-eef188423294",
      "5533fec5-f2e6-46ca-a5e8-17ccc2cccc8f",
      "19f63e21-5fb8-4b1d-945b-a2227093ea8b"
    ],
    "type": "flight"
  },
  {
    "id": "62f809b5-6de0-4195-9357-129d2d1b6179",
    "base_price": 6740,
    "date_from": "2026-05-24T05:34:05.804Z",
    "date_to": "2026-05-25T21:41:05.804Z",
    "destination": "21ee2714-abfc-42e3-8b30-8c8516698435",
    "is_favorite": true,
    "offers": [],
    "type": "ship"
  },
  {
    "id": "e97492c4-4017-48a4-bc2a-60687ce6fe3c",
    "base_price": 9770,
    "date_from": "2026-05-26T22:38:05.804Z",
    "date_to": "2026-05-27T19:31:05.804Z",
    "destination": "c928b356-6eac-45bc-8456-9200c8219546",
    "is_favorite": true,
    "offers": [],
    "type": "ship"
  },
  {
    "id": "7b556bde-c906-4dc7-93b7-b46245fd9d0f",
    "base_price": 7400,
    "date_from": "2026-05-29T15:19:05.804Z",
    "date_to": "2026-05-31T09:36:05.804Z",
    "destination": "9a19e8ca-b32b-4841-9212-2780884ecb8e",
    "is_favorite": false,
    "offers": [
      "fbc1763e-7353-42b2-9b68-8ea80a155685",
      "7f5db014-abf0-4851-a1f2-6a1efb6a2043"
    ],
    "type": "taxi"
  },
  {
    "id": "6bd8dd84-3d90-4f73-85ce-fc4a3c5589f6",
    "base_price": 4917,
    "date_from": "2026-06-02T05:27:05.804Z",
    "date_to": "2026-06-02T23:12:05.804Z",
    "destination": "7655ac0a-99d2-4435-ae91-36690216dcb4",
    "is_favorite": true,
    "offers": [
      "412fdb97-c1d8-4f49-96d1-c214bcf5996b"
    ],
    "type": "check-in"
  }
];

export const getRandomPoint = () => getRandomArrayElement(pointsMocks);
