import { computeAverage, EnrollmentStatus } from './gradeUtils';
import getStatus from './gradeUtils';

// Interfaces
interface Enrollee {
  name: string;
  prelim: number;
  midterm: number;
  final: number;
}

type EligibilityReport = {
  name: string;
  average: number;
  status: EnrollmentStatus;
  remarks?: string;
};

// Starter Data
const enrollees: Enrollee[] = [
  { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
  { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
  { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
  { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
  { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 },
];

// Union Type Example
let batchId: string | number = "BATCH-2026-IT313";
if (typeof batchId === "string") {
  console.log(`Batch: ${batchId}\n`);
}

// Generic Function
function groupBy<T>(items: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return items.reduce((result, item) => {
    const key = keyFn(item);
    if (!result[key]) result[key] = [];
    result[key].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

// Simulate API fetch
function getEnrollees(): Promise<Enrollee[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(enrollees), 1000);
  });
}

// Main function
async function main() {
  try {
    const students = await getEnrollees();
    
    const reports: EligibilityReport[] = students.map(s => {
      const avg = computeAverage(s.prelim, s.midterm, s.final);
      const status = getStatus(avg);
      return {
        name: s.name,
        average: avg,
        status: status,
        remarks: status === EnrollmentStatus.Probation ? "Needs consultation" : undefined
      };
    });

    console.log("=== IT313 Enrollment Eligibility Report (TypeScript) ===");
    reports.forEach(r => {
      const st = EnrollmentStatus[r.status].toUpperCase();
      console.log(`${r.name} - Average: ${r.average.toFixed(2)} - ${st}${r.remarks ? ` - ${r.remarks}` : ''}`);
    });

    const classAvg = reports.reduce((sum, r) => sum + r.average, 0) / reports.length;
    console.log(`Class Average: ${classAvg.toFixed(2)}`);
    
    const passing = reports.filter(r => r.status === EnrollmentStatus.Passing).length;
    console.log(`Passing: ${passing} / ${reports.length}`);

  } catch (err) {
    console.error("Error:", err);
  }
}

main();
                                 
