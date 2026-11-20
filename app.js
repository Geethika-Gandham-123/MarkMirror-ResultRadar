
document.addEventListener("DOMContentLoaded", function () {

    // Generate 100 sample students automatically
    const firstNames = [
        "Aarav", "Ananya", "Rahul", "Priya", "Arjun",
        "Sneha", "Karthik", "Divya", "Rohit", "Kavya"
    ];

    const lastNames = [
        "Sharma", "Reddy", "Kumar", "Patel", "Singh",
        "Rao", "Gupta", "Verma", "Nair", "Das"
    ];

    const subjectNames = [
        "Mathematics",
        "Physics",
        "Programming",
        "English",
        "Chemistry",
        "Electronics"
    ];

    const credits = [4, 3, 4, 2, 3, 3];

    const students = [];

    for (let i = 0; i < 100; i++) {

        const studentName =
            firstNames[i % 10] + " " +
            lastNames[Math.floor(i / 10)];

        const subjects = subjectNames.map(function (subject, j) {
            const marks = 35 + ((i * 13 + j * 17) % 65);

            return {
                name: subject,
                marks: marks,
                credits: credits[j]
            };
        });

        students.push({
            hallTicket: "22CSE" + (101 + i),
            name: studentName,
            department: "CSE",
            semester: 1,
            subjects: subjects
        });
    }

    // Grade point calculation
    function getGradePoint(marks) {
        if (marks >= 90) return 10;
        if (marks >= 80) return 9;
        if (marks >= 70) return 8;
        if (marks >= 60) return 7;
        if (marks >= 50) return 6;
        if (marks >= 40) return 5;
        return 0;
    }

    // SGPA calculation
    function calculateSGPA(student) {
        let totalCredits = 0;
        let weightedPoints = 0;

        student.subjects.forEach(function (subject) {
            totalCredits += subject.credits;
            weightedPoints +=
                getGradePoint(subject.marks) * subject.credits;
        });

        return totalCredits === 0
            ? 0
            : (weightedPoints / totalCredits).toFixed(2);
    }

    // Navigation
    const buttons = document.querySelectorAll(".nav-btn");
    const pages = document.querySelectorAll(".page");

    function showPage(pageId) {
        pages.forEach(function (page) {
            page.classList.toggle("active", page.id === pageId);
        });

        buttons.forEach(function (button) {
            button.classList.toggle(
                "active",
                button.dataset.page === pageId
            );
        });
    }

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            showPage(button.dataset.page);
        });
    });

    document.querySelectorAll("[data-go]").forEach(function (button) {
        button.addEventListener("click", function () {
            showPage(button.dataset.go);
        });
    });

    // Result Lookup
    const searchBtn = document.getElementById("searchBtn");

    if (searchBtn) {
        searchBtn.addEventListener("click", function () {

            const hallTicket = document
                .getElementById("hallTicket")
                .value.trim().toUpperCase();

            const student = students.find(function (s) {
                return s.hallTicket === hallTicket;
            });

            const display = document.getElementById("resultDisplay");

            if (!student) {
                display.innerHTML =
                    "<p class='error'>Student not found! Enter a valid Hall Ticket Number.</p>";
                return;
            }

            let table = `
                <h2>${student.name}</h2>
                <p><strong>Hall Ticket:</strong> ${student.hallTicket}</p>
                <p><strong>Department:</strong> ${student.department}</p>
                <p><strong>Semester:</strong> ${student.semester}</p>
                <h2>SGPA: ${calculateSGPA(student)}</h2>

                <table>
                    <tr>
                        <th>Subject</th>
                        <th>Marks</th>
                        <th>Credits</th>
                        <th>Grade Point</th>
                        <th>Status</th>
                    </tr>
            `;

            student.subjects.forEach(function (subject) {
                table += `
                    <tr>
                        <td>${subject.name}</td>
                        <td>${subject.marks}</td>
                        <td>${subject.credits}</td>
                        <td>${getGradePoint(subject.marks)}</td>
                        <td>${subject.marks >= 40 ? "PASS" : "FAIL"}</td>
                    </tr>
                `;
            });

            table += "</table>";

            display.innerHTML = table;
        });
    }

    // Analytics
    const analytics = document.getElementById("analyticsContent");

    if (analytics) {

        let totalSubjects = 0;
        let passedSubjects = 0;

        students.forEach(function (student) {
            student.subjects.forEach(function (subject) {
                totalSubjects++;

                if (subject.marks >= 40) {
                    passedSubjects++;
                }
            });
        });

        const passRate = (
            passedSubjects / totalSubjects * 100
        ).toFixed(2);

        analytics.innerHTML = `
            <div class="cards">
                <div class="card">
                    <h3>Total Students</h3>
                    <h2>${students.length}</h2>
                </div>

                <div class="card">
                    <h3>Total Subject Records</h3>
                    <h2>${totalSubjects}</h2>
                </div>

                <div class="card">
                    <h3>Passed Subjects</h3>
                    <h2>${passedSubjects}</h2>
                </div>

                <div class="card">
                    <h3>Overall Pass Rate</h3>
                    <h2>${passRate}%</h2>
                </div>
            </div>
        `;
    }

    // Leaderboard
    const leaderboard = document.getElementById("leaderboardContent");

    if (leaderboard) {

        const rankedStudents = [...students].sort(function (a, b) {
            return calculateSGPA(b) - calculateSGPA(a);
        });

        let html = `
            <table>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Hall Ticket</th>
                    <th>SGPA</th>
                </tr>
        `;

        rankedStudents.forEach(function (student, index) {
            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${student.name}</td>
                    <td>${student.hallTicket}</td>
                    <td>${calculateSGPA(student)}</td>
                </tr>
            `;
        });

        html += "</table>";

        leaderboard.innerHTML = html;
    }

    // Re-evaluation Fee Calculator
    const feeBtn = document.getElementById("feeBtn");

    if (feeBtn) {
        feeBtn.addEventListener("click", function () {

            const count = Number(
                document.getElementById("subjectCount").value
            );

            const feeResult = document.getElementById("feeResult");

            if (count <= 0) {
                feeResult.innerText =
                    "Please enter a valid number of subjects.";
                return;
            }

            const feePerSubject = 500;
            const totalFee = count * feePerSubject;

            feeResult.innerText =
                "Total Re-evaluation Fee: ₹" + totalFee;
        });
    }

    // Difficulty Index
    const difficulty = document.getElementById("difficultyContent");

    if (difficulty) {

        const subjectStats = {};

        students.forEach(function (student) {
            student.subjects.forEach(function (subject) {

                if (!subjectStats[subject.name]) {
                    subjectStats[subject.name] = {
                        total: 0,
                        failed: 0
                    };
                }

                subjectStats[subject.name].total++;

                if (subject.marks < 40) {
                    subjectStats[subject.name].failed++;
                }
            });
        });

        let html = `
            <table>
                <tr>
                    <th>Subject</th>
                    <th>Failure Rate</th>
                    <th>Difficulty</th>
                </tr>
        `;

        Object.keys(subjectStats).forEach(function (subject) {

            const stats = subjectStats[subject];

            const rate =
                stats.failed / stats.total * 100;

            let level = "Easy";

            if (rate >= 40) {
                level = "Hard";
            } else if (rate >= 20) {
                level = "Moderate";
            }

            html += `
                <tr>
                    <td>${subject}</td>
                    <td>${rate.toFixed(1)}%</td>
                    <td>${level}</td>
                </tr>
            `;
        });

        html += "</table>";

        difficulty.innerHTML = html;
    }

    // Student Trends
    const trendsPage = document.getElementById("trends");

    if (trendsPage) {

        trendsPage.innerHTML += `
            <h2>Student Performance</h2>

            <table>
                <tr>
                    <th>Student</th>
                    <th>Hall Ticket</th>
                    <th>SGPA</th>
                </tr>

                ${students.map(function (student) {
                    return `
                        <tr>
                            <td>${student.name}</td>
                            <td>${student.hallTicket}</td>
                            <td>${calculateSGPA(student)}</td>
                        </tr>
                    `;
                }).join("")}
            </table>
        `;
    }

    // Batch Comparison
    const batches = document.getElementById("batches");

    if (batches) {

        const averageSGPA = (
            students.reduce(function (sum, student) {
                return sum + Number(calculateSGPA(student));
            }, 0) / students.length
        ).toFixed(2);

        batches.innerHTML += `
            <div class="cards">
                <div class="card">
                    <h3>Sample Batch</h3>
                    <h2>2026</h2>
                </div>

                <div class="card">
                    <h3>Total Students</h3>
                    <h2>${students.length}</h2>
                </div>

                <div class="card">
                    <h3>Average SGPA</h3>
                    <h2>${averageSGPA}</h2>
                </div>
            </div>
        `;
    }

    console.log("100 students successfully generated!");

});
