# 🛡️ Guard Schedule Planner 🛡️

Welcome to the Guard Schedule Planner! This tool is designed to help efficiently and fairly assign guards to shifts throughout the week. By following a systematic process, we ensure that every shift is covered while maintaining fairness among the guards.

## 📖 Table of Contents
- [Introduction](#-introduction)
- [Features](#-features)
- [How It Works](#-how-it-works)
- [Setup Instructions](#-setup-instructions)
- [Scheduling Process Explained](#-scheduling-process-explained)
  - [Ensure Minimum Coverage First](#1-ensure-minimum-coverage-first)
  - [Handle Understaffed Shifts Early](#2-handle-understaffed-shifts-early)
  - [Fallback Assignment Logic](#3-fallback-assignment-logic)
  - [Randomization as a Last Resort](#4-randomization-as-a-last-resort)
  - [Final Verification and Rebalancing](#5-final-verification-and-rebalancing)
- [Contributing](#-contributing)
- [License](#-license)

## 🌟 Introduction

The Guard Schedule Planner is a tool designed to automatically generate a schedule for a group of guards, ensuring that all shifts are covered. The application takes into account each guard's availability and aims to distribute shifts as fairly as possible.

## ✨ Features

- **Automated Scheduling:** Automatically assigns guards to shifts based on their availability.
- **Fair Distribution:** Ensures that shifts are distributed fairly among all guards.
- **Responsive Design:** User interface is designed to work on both desktop and mobile devices.
- **Language Support:** Switch between English and Hebrew with ease.

## ⚙️ How It Works

The Guard Schedule Planner operates by taking input from the user regarding which guards are available for which shifts. The application then uses an intelligent algorithm to assign guards to shifts, ensuring that all shifts are covered while maintaining fairness.

## 🛠️ Setup Instructions

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/AdirBuskila/guard-schedule-planner.git
    cd guard-schedule-planner
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Run the Application:**

    ```bash
    npm start
    ```

4. **Open in Browser:**
   - Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📝 Scheduling Process Explained

The scheduling process follows a well-defined strategy to ensure that all shifts are covered fairly and efficiently:

### 1. Ensure Minimum Coverage First

- **💼 Goal:** Before starting the assignment process, ensure that there are enough guards available to cover all shifts.
- **🔍 How:** The algorithm checks if the total number of guards available for each shift type meets the minimum required shifts for the entire schedule. This step prevents any uncovered shifts due to a lack of available guards.

### 2. Handle Understaffed Shifts Early

- **🚨 Goal:** Prioritize shifts that have fewer available guards to prevent potential gaps.
- **🔄 How:** The algorithm first assigns guards to the most under-covered shifts (e.g., night shifts or weekend shifts with fewer volunteers). This minimizes the chance of ending up with shifts that cannot be filled later in the process.

### 3. Fallback Assignment Logic

- **🛠️ Goal:** Ensure that no shift goes unfilled, even if it requires breaking the fairness rules.
- **🔧 How:** If a shift cannot be filled using the standard fairness logic (assigning guards with fewer shifts first), the algorithm will assign any available guard, regardless of their current shift count, to ensure that all shifts are covered.

### 4. Randomization as a Last Resort

- **🎲 Goal:** Avoid bias and fill any remaining shifts that are difficult to assign.
- **🔀 How:** If all other strategies fail, the algorithm will randomly assign available guards to the remaining unfilled shifts. This helps avoid situations where some shifts remain uncovered due to the constraints of fairness and availability.

### 5. Final Verification and Rebalancing

- **✔️ Goal:** Ensure the final schedule is complete and balanced.
- **📝 How:** After the initial assignment, the algorithm performs a final verification. It checks if all shifts are filled and rebalances by reassigning guards from shifts with more than their expected shift count to those that are under-covered.

## 🤝 Contributing

We welcome contributions to improve the Guard Schedule Planner! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with a descriptive message.
4. Push your branch to your fork.
5. Create a pull request to the main repository.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
