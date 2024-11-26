# PrimeCorn App

A React Native application utilizing the React Native BLE library to communicate with Bluetooth Low Energy (BLE) devices.

---

## Prerequisites

Before starting, ensure the following tools are installed:

1. **Node.js**: Required for running the project. [Download here](https://nodejs.org).
2. **Expo CLI**: A command-line tool to develop and test React Native apps. Install globally:
3. **EAS CLI**: Used for building APKs. Install globally:
   ```bash
   npm install -g eas-cli
---

## Setup

1. **Clone the Repository**:
   Clone the project repository to your local machine:
   ```bash
   git clone <repository-url>
   cd <project-folder>

2. **Install Dependencies**:  
   Install the required libraries and packages:
   ```bash
   npm install


## Building the APK
Use the following command to build the app locally:

```bash
eas build --profile development --platform android --local

```
After that get the .apk file generated and download it on the android device. 

> **Caveat:**  
> You need to rebuild the apk every time you have a new dependency on the project. But for UI changes there is no need!

## Running the Project
Launch the app locally by running on yout computer.

```bash
npx expo start
