// Mock data for the Voice Health Agent Dashboard

export const currentUser = {
  id: 1,
  full_name: "Fatima Khan",
  age: 68,
  gender: "Female",
  phone: "+92 (300) 1234567",
  email: "fatima.khan@email.com",
  emergency_contact: "+92 (300) 7654321",
  doctor_id: 1,
  avatar: "FK",
}

export const doctor = {
  id: 1,
  full_name: "Dr. Ahmed Hassan",
  specialization: "Cardiology",
  phone: "+92 (42) 35555555",
  email: "dr.ahmed@aga-khan.com",
  hospital: "Aga Khan University Hospital, Lahore",
}

export const medications = [
  {
    id: 1,
    medicine_name: "Metoprolol",
    dosage: "50mg",
    frequency: "Twice daily",
    start_date: "2026-01-15",
    end_date: "2026-06-15",
    time_slots: ["08:00 AM", "08:00 PM"],
    status: "active",
  },
  {
    id: 2,
    medicine_name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    start_date: "2026-01-20",
    end_date: "2026-07-20",
    time_slots: ["09:00 AM"],
    status: "active",
  },
  {
    id: 3,
    medicine_name: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily",
    start_date: "2026-02-01",
    end_date: "2026-08-01",
    time_slots: ["09:00 PM"],
    status: "active",
  },
  {
    id: 4,
    medicine_name: "Aspirin",
    dosage: "81mg",
    frequency: "Once daily",
    start_date: "2026-01-10",
    end_date: "2026-12-31",
    time_slots: ["08:00 AM"],
    status: "active",
  },
  {
    id: 5,
    medicine_name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    start_date: "2026-02-10",
    end_date: "2026-08-10",
    time_slots: ["07:30 AM", "07:30 PM"],
    status: "active",
  },
]

export const todayReminders = [
  { id: 1, medicine: "Metoprolol 50mg", time: "08:00 AM", status: "taken", takenAt: "08:05 AM" },
  { id: 2, medicine: "Aspirin 81mg", time: "08:00 AM", status: "taken", takenAt: "08:05 AM" },
  { id: 3, medicine: "Metformin 500mg", time: "07:30 AM", status: "taken", takenAt: "07:35 AM" },
  { id: 4, medicine: "Lisinopril 10mg", time: "09:00 AM", status: "taken", takenAt: "09:10 AM" },
  { id: 5, medicine: "Metformin 500mg", time: "07:30 PM", status: "pending", takenAt: null },
  { id: 6, medicine: "Metoprolol 50mg", time: "08:00 PM", status: "upcoming", takenAt: null },
  { id: 7, medicine: "Atorvastatin 20mg", time: "09:00 PM", status: "upcoming", takenAt: null },
]

export const healthLogs = [
  { id: 1, date: "2026-02-28", vital_type: "Blood Pressure", value: "128/82", status: "Normal", heart_rate: 72, oxygen: 97, temp: 98.4 },
  { id: 2, date: "2026-02-27", vital_type: "Blood Pressure", value: "135/88", status: "Elevated", heart_rate: 78, oxygen: 96, temp: 98.6 },
  { id: 3, date: "2026-02-26", vital_type: "Blood Pressure", value: "150/95", status: "High", heart_rate: 85, oxygen: 95, temp: 99.1 },
  { id: 4, date: "2026-02-25", vital_type: "Blood Pressure", value: "132/84", status: "Normal", heart_rate: 74, oxygen: 97, temp: 98.5 },
  { id: 5, date: "2026-02-24", vital_type: "Blood Pressure", value: "140/90", status: "Elevated", heart_rate: 80, oxygen: 96, temp: 98.7 },
  { id: 6, date: "2026-02-23", vital_type: "Blood Pressure", value: "126/80", status: "Normal", heart_rate: 70, oxygen: 98, temp: 98.3 },
  { id: 7, date: "2026-02-22", vital_type: "Blood Pressure", value: "145/92", status: "High", heart_rate: 82, oxygen: 95, temp: 98.8 },
]

export const healthTrendsData = [
  { date: "Feb 16", systolic: 130, diastolic: 84, heartRate: 74, sugar: 105, oxygen: 97 },
  { date: "Feb 17", systolic: 128, diastolic: 82, heartRate: 72, sugar: 102, oxygen: 98 },
  { date: "Feb 18", systolic: 135, diastolic: 88, heartRate: 78, sugar: 115, oxygen: 96 },
  { date: "Feb 19", systolic: 142, diastolic: 90, heartRate: 82, sugar: 120, oxygen: 95 },
  { date: "Feb 20", systolic: 138, diastolic: 86, heartRate: 76, sugar: 108, oxygen: 97 },
  { date: "Feb 21", systolic: 125, diastolic: 80, heartRate: 70, sugar: 100, oxygen: 98 },
  { date: "Feb 22", systolic: 145, diastolic: 92, heartRate: 82, sugar: 125, oxygen: 95 },
  { date: "Feb 23", systolic: 126, diastolic: 80, heartRate: 70, sugar: 98, oxygen: 98 },
  { date: "Feb 24", systolic: 140, diastolic: 90, heartRate: 80, sugar: 118, oxygen: 96 },
  { date: "Feb 25", systolic: 132, diastolic: 84, heartRate: 74, sugar: 106, oxygen: 97 },
  { date: "Feb 26", systolic: 150, diastolic: 95, heartRate: 85, sugar: 130, oxygen: 95 },
  { date: "Feb 27", systolic: 135, diastolic: 88, heartRate: 78, sugar: 112, oxygen: 96 },
  { date: "Feb 28", systolic: 128, diastolic: 82, heartRate: 72, sugar: 104, oxygen: 97 },
]

export const adherenceData = [
  { name: "Taken on Time", value: 72, fill: "var(--color-chart-2)" },
  { name: "Delayed", value: 18, fill: "var(--color-chart-4)" },
  { name: "Missed", value: 10, fill: "var(--color-chart-3)" },
]

export const emergencyEvents = [
  { id: 1, event_type: "High BP Alert", severity: "Critical", triggered_at: "2026-02-26 14:30", doctor_notified: true, resolved: true },
  { id: 2, event_type: "Irregular Heart Rate", severity: "Warning", triggered_at: "2026-02-22 09:15", doctor_notified: true, resolved: true },
  { id: 3, event_type: "Low Oxygen", severity: "Critical", triggered_at: "2026-02-18 22:45", doctor_notified: true, resolved: true },
  { id: 4, event_type: "High Sugar", severity: "Warning", triggered_at: "2026-02-15 11:00", doctor_notified: false, resolved: true },
]

export const emergencyMonthlyData = [
  { month: "Sep", count: 1, critical: 0, warning: 1 },
  { month: "Oct", count: 2, critical: 1, warning: 1 },
  { month: "Nov", count: 1, critical: 1, warning: 0 },
  { month: "Dec", count: 3, critical: 2, warning: 1 },
  { month: "Jan", count: 2, critical: 1, warning: 1 },
  { month: "Feb", count: 4, critical: 2, warning: 2 },
]

export const reminderPerformance = [
  { month: "Sep", successful: 85, missed: 10, offline: 5 },
  { month: "Oct", successful: 88, missed: 8, offline: 4 },
  { month: "Nov", successful: 82, missed: 12, offline: 6 },
  { month: "Dec", successful: 90, missed: 6, offline: 4 },
  { month: "Jan", successful: 87, missed: 9, offline: 4 },
  { month: "Feb", successful: 92, missed: 5, offline: 3 },
]

export const voiceInteractionLogs = [
  { id: 1, timestamp: "08:00 AM", command: "Assalam-o-alaikum, VitaVoice", response: "Assalam-o-alaikum, Fatima! Aap ke Metoprolol aur Aspirin lene ka waqt aa gaya hai.", type: "reminder" },
  { id: 2, timestamp: "08:05 AM", command: "Maine apni subah ki davaiyaan le li hain", response: "Bilkul! Metoprolol aur Aspirin 8:05 AM par record ho gayin.", type: "confirmation" },
  { id: 3, timestamp: "09:00 AM", command: "Mera blood pressure aaj kya hai?", response: "Aap ki taaza reading 128/82 mmHg hai. Yeh normal range mein hai.", type: "query" },
  { id: 4, timestamp: "09:10 AM", command: "Aaj ke khane ke baare mein batao", response: "Aaj ke liye: Kam namak ka khana recommended hai. Processed foods se bachayen. Potassium wali cheezen zyada le sakte ho.", type: "info" },
  { id: 5, timestamp: "11:30 AM", command: "Meri sugar level log karo - 104", response: "Blood sugar 104 mg/dL record ho gai. Yeh aap ke target mein hai.", type: "log" },
  { id: 6, timestamp: "02:00 PM", command: "Mera agla checkup kab hai?", response: "Aap ka agla appointment Dr. Ahmed Hassan ke saath 5 March 2026 ko 10:00 AM par hai.", type: "query" },
]

export const diagnosis = {
  id: 1,
  diagnosis_text: "Hypertension Stage 1, Type 2 Diabetes (controlled), Hyperlipidemia",
  diet_plan: "Low sodium (less than 2,300mg/day), DASH diet recommended. Increase potassium-rich foods. Limit refined sugars and processed carbohydrates. 5 servings of fruits and vegetables daily.",
  routine_plan: "30 minutes of moderate walking daily. Blood pressure check twice daily. Blood sugar monitoring before meals. Weekly weight measurement.",
  created_at: "2026-01-15",
}

export const dashboardMetrics = {
  avgResponseTime: "1.2s",
  reminderSuccessRate: "92%",
  emergencyTriggerFreq: "4/month",
  offlineAlertSuccess: "98%",
  healthStabilityScore: 82,
}
