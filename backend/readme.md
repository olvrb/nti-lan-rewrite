# nti-lan
[![Build Status](https://travis-ci.com/olvrb/nti-lan.svg?branch=master)](https://travis-ci.com/olvrb/nti-lan)

## Usage

* `git clone https://github.com/olvrb/typescript-express-boilerplate`
* `cd typescript-express-boilerplate`
* `mv src/Config.example.ts src/Config.ts`
* `yarn -D`
* `yarn dev`


## API Endpoints

### **POST** `/api/v1/bookings/book` auth

Create a booking. Redirects to /user/bookings if success.

#### Parameters

- `seat`: The set ID for seatsio to reserve.

#### Example Request 

**Content-Type:** `application/json`

```json
{
    "seat": "A-1-3"
}
```
---

### **POST** `/api/v1/bookings/paid` auth admin

Mark a booking as paid. Redirects to /admin/bookings if success.

#### Parameters

- `booking`: The booking ID.

- `reason`: Reason for marking the booking as paid, e.g: Swish transaction Id.

#### Example Request

**Content-Type:** `application/json`

```json
{
    "booking": "uid",
    "reason": "123456789"
}
```
---

### **POST** `/api/v1/bookings/remove` auth

Remove a booking. Redirects to /user/bookings if success.

#### Parameters
- `booking`: The booking ID.

#### Example Request

**Content-Type:** `application/json`

```json
{
    "booking": "uid"
}
```
---

### **POST** `/auth/login`

Login with email and password. Redirects to /book if success, else to `/auth/login?loginError`.

#### Parameters
- `email`: Email.
- `password`: Password.

#### Example Request

**Content-Type:** `application/json`

```json
{
    "email": "example@example.com",
    "password": "123456789"
}
```
---

### **GET** `/auth/signout`

Sign out. Redirects to /auth/login.

---

### **POST** `/auth/signup`

Sign up as a new user. Redirects to /auth/login.

#### Parameters
- `email`: Email.
- `password`: Password
- `nationalId`: National ID/SSN/Personnummer in format `YYMMDD-XXXX`
- `name`: Name.
- `surname`: Surname.
- `phone`: Phone number in format `0712345678`
- `adultPhone`: Adult phone number.
- `address`: Address.
- `postcode`: Postcode.
- `city`: City.

#### Example Request

**Content-Type:** `application/json`

```json
{
    "email": "example@example.com",
    "password": "123456789",
    "nationalId": "970425-XXXX",
    "name": "John",
    "surname": "Doe",
    "phone": "0712345678",
    "adultPhone": "0712345678",
    "address": "Hantverkargatan 1",
    "postcode": "11266",
    "city": "Stockholm"
}
```