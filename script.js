function calculateAge() {
    const birthdateInput = document.getElementById('birthdate');
    const resultDiv = document.getElementById('result');
    
    if (!birthdateInput.value) {
        resultDiv.innerHTML = '<div class="error">Please select your birth date first!</div>';
        resultDiv.classList.add('show');
        return;
    }
    
    const birthDate = new Date(birthdateInput.value);
    const today = new Date();
    
    // Check if birth date is in the future
    if (birthDate > today) {
        resultDiv.innerHTML = '<div class="error">Birth date cannot be in the future!</div>';
        resultDiv.classList.add('show');
        return;
    }
    
    // Calculate age
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
    
    // Adjust for negative days
    if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }
    
    // Adjust for negative months
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // Calculate additional stats
    const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    
    // Calculate next birthday
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
    
    // Display result
    resultDiv.innerHTML = `
        <div class="age-display">
            You are ${years} years, ${months} months, and ${days} days old!
        </div>
        
        <div class="stats-grid">
            <div class="stat-item">
                <span class="stat-number">${totalDays.toLocaleString()}</span>
                <div class="stat-label">Total Days</div>
            </div>
            <div class="stat-item">
                <span class="stat-number">${totalWeeks.toLocaleString()}</span>
                <div class="stat-label">Total Weeks</div>
            </div>
            <div class="stat-item">
                <span class="stat-number">${totalMonths}</span>
                <div class="stat-label">Total Months</div>
            </div>
            <div class="stat-item">
                <span class="stat-number">${totalHours.toLocaleString()}</span>
                <div class="stat-label">Total Hours</div>
            </div>
            <div class="stat-item">
                <span class="stat-number">${totalMinutes.toLocaleString()}</span>
                <div class="stat-label">Total Minutes</div>
            </div>
            <div class="stat-item">
                <span class="stat-number">${daysUntilBirthday}</span>
                <div class="stat-label">Days to Birthday</div>
            </div>
        </div>
    `;
    
    resultDiv.classList.add('show');
}

// Allow Enter key to calculate
document.getElementById('birthdate').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculateAge();
    }
});

// Set max date to today
document.getElementById('birthdate').max = new Date().toISOString().split('T')[0];