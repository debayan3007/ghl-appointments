
# Appointment Assignment (GHL)

The purpose of this tool (GHL) is to make appointment booking between people a lot easier. The usual process is to exchange mails between people till they find a convenient time.



## Setup

```bash
Backend:
  npm install
  npm run dev / npm start

Frontend:
  cd client
  npm i
  npm start / npm build
```
    
## Deployment

To deploy this project run

```bash
  Auto deploy is enabled, pushing to master will start deployment
```


## Tech

### Server

**Tech Stack:** Node, Express, Firestore

### Client

**Tech Stack:** React, NextJS, Material UI

## Features


| Routes | Contents                     |
| ------ | ---------------------------- |
|/booking|View to book an appointment   |
|/events |View the list of booked events|



## API Reference

#### Get all items

```http
  GET /events
```

| Parameter   | Type     | Description                  |
| :---------- | :------- | :--------------------------- |
| `startdate` | `string` | start date of the get filter |
| `enddate`   | `string` | start date of the get filter |

#### Get item

```http
  GET /events/freeslots
```

| Parameter   | Type     | Description                       |
| :---------- | :------- | :-------------------------------- |
| `date`      | `string` | Date for fetching available slots |
| `timezone`  | `string` | timezone of the user              |

```http
  POST /events
```

| Parameter      | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `date`         | `string` | Date for fetching available slots |
| `timezone`     | `string` | timezone of the user              |
| `time`         | `string` | time for the appointment          |
| `clientName`   | `string` | _Optional_ Name of the client     |
| `clientEmail`  | `string` | _Optional_ Email of the user      |

