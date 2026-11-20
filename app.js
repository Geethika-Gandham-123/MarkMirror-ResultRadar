
document.addEventListener("DOMContentLoaded", function () {

    // Sample student database
    const students = [
        {
            hallTicket: "22CSE101",
            name: "Rahul Sharma",
            department: "CSE",
            semester: 1,
            subjects: [
                { name: "Mathematics", marks: 85, credits: 4 },
                { name: "Physics", marks: 78, credits: 3 },
                { name: "Programming", marks: 92, credits: 4 },
                { name: "English", marks: 80, credits: 2 },
                { name: "Chemistry", marks: 72, credits: 3 },
                { name: "Electronics", marks: 88, credits: 3 }
            ]
        },
        {
            hallTicket: "22CSE102",
            name: "Priya Reddy",
            department: "CSE",
            semester: 1,
            subjects: [
                { name: "Mathematics", marks: 90, credits: 4 },
                { name: "Physics", marks: 85, credits: 3 },
                { name: "Programming", marks: 95, credits: 4 },
                { name: "English", marks: 88, credits: 2 },
                { name: "Chemistry", marks: 82, credits: 3 },
                { name: "Electronics", marks: 91, credits: 3 }
            ]
        },
        {
            hallTicket: "22CSE103",
            name: "Arjun Kumar",
            department: "CSE",
            semester: 1,
            subjects: [
                { name: "Mathematics", marks: 65, credits: 4 },
                { name: "Physics", marks: 58, credits: 3 },
                { name: "Programming", marks: 70, credits: 4 },
                { name: "English", marks: 75, credits: 2 },
                { name: "Chemistry", marks: 60, credits: 3 },
                { name: "Electronics", marks: 68, credits: 3 }
            ]
        },
        {
            hallTicket: "22CSE104",
            name: "Sneha Patel",
            department: "CSE",
            semester: 1,
            subjects: [
                { name: "Mathematics", marks: 45, credits: 4 },
                { name: "Physics", marks: 38, credits: 3 },
                { name: "Programming", marks: 75, credits: 4 },
                { name: "English", marks: 82, credits: 2 },
                { name: "Chemistry", marks: 55, credits: 3 },
                { name: "Electronics", marks: 60, credits: 3 }
            ]
        },
        {
            hallTicket: "22CSE105",
            name: "Vikram Singh",
            department: "CSE",
            semester: 1,
            subjects: [
                { name: "Mathematics", marks: 35, credits: 4 },
                { name: "Physics", marks: 42, credits: 3 },
                { name: "Programming", marks: 55, credits: 4 },
                { name: "English", marks: 65, credits: 2 },
                { name: "Chemistry", marks: 32, credits: 3 },
                { name: "Electronics", marks: 48, credits: 3 }
            ]
        }
    ];

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

        student.subjects.forEach(subject => {
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
        pages.forEach(page => {
            page.classList.toggle("active", page.id === pageId);
        });

        buttons.forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.page === pageId
            );
        });
    }

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            showPage(button.dataset.page);
        });
    });

    document.querySelectorAll("[data-go]").forEach(button => {
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

            const student = students.find(
                s => s.hallTicket === hallTicket
            );

            const display = document.getElementById("resultDisplay");

            if (!student) {
                display.innerHTML =
                    "<p class='error'>Student not found! Please enter a valid Hall Ticket Number.</p>";
                return;
            }

            const sgpa = calculateSGPA(student);

            let table = `
                <h2>${student.name}</h2>
                <p><strong>Hall Ticket:</strong> ${student.hallTicket}</p>
                <p><strong>Department:</strong> ${student.department}</p>
                <p><strong>Semester:</strong> ${student.semester}</p>
                <h2>SGPA: ${sgpa}</h2>
                <table>
                    <tr>
                        <th>Subject</th>
                        <th>Marks</th>
                        <th>Credits</th>
                        <th>Grade Point</th>
                        <th>Status</th>
                    </tr>
            `;

            student.subjects.forEach(subject => {
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

        students.forEach(student => {
            student.subjects.forEach(subject => {
                totalSubjects++;
                if (subject.marks >= 40) {
                    passedSubjects++;
                }
            });
        });

        const passRate = (
            (passedSubjects / totalSubjects) * 100
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
        const rankedStudents = [...students].sort(
            (a, b) => calculateSGPA(b) - calculateSGPA(a)
        );

        let html = `
            <table>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Hall Ticket</th>
                    <th>SGPA</th>
                </tr>
        `;

        rankedStudents.forEach((student, index) => {
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

        students.forEach(student => {
            student.subjects.forEach(subject => {
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

        Object.keys(subjectStats).forEach(subject => {
            const stats = subjectStats[subject];
            const rate = (stats.failed / stats.total) * 100;

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
            <h2>Current Semester Performance</h2>
            <p>SGPA is calculated using subject marks and credits.</p>
            <table>
                <tr>
                    <th>Student</th>
                    <th>Hall Ticket</th>
                    <th>SGPA</th>
                </tr>
                ${students.map(student => `
                    <tr>
                        <td>${student.name}</td>
                        <td>${student.hallTicket}</td>
                        <td>${calculateSGPA(student)}</td>
                    </tr>
                `).join("")}
            </table>
        `;
    }

    // Batch Comparison
    const batches = document.getElementById("batches");

    if (batches) {
        const averageSGPA = (
            students.reduce(
                (sum, student) => sum + Number(calculateSGPA(student)),
                0
            ) / students.length
        ).toFixed(2);

        batches.innerHTML += `
            <div class="cards">
                <div class="card">
                    <h3>Sample Batch</h3>
                    <h2>2026</h2>
                </div>

                <div class="card">
                    <h3>Students</h3>
                    <h2>${students.length}</h2>
                </div>

                <div class="card">
                    <h3>Average SGPA</h3>
                    <h2>${averageSGPA}</h2>
                </div>
            </div>
        `;
    }

    console.log("MarkMirror ResultRadar Rush is ready!");

});
