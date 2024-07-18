<script></script>
<template>
<div class="container rounded shadow-sm">
    <form action="">
        <div class="row">
            <div class="col-md-6 col-12 mb-4">
                <div class="form-control d-flex flex-column">
                    <p class="h-blue">Request Date:</p>
                    <input class="inputbox textmuted" type="date">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-12 mb-4">
                <div class="form-control d-flex flex-column">
                    <p class="h-blue">Applicant's Name:</p>
                    <input class="inputbox" placeholder="First Name" type="text">
                </div>
            </div>
            <div class="col-md-6 col-12 mb-4">
                <div class="form-control d-flex flex-column">
                    <p class="h-blue">Last Name:</p>
                    <input class="inputbox" placeholder="Surname" type="text">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mb-4">
                <div class="form-control d-flex flex-column">
                    <p class="h-blue">Title of The Request:</p>
                    <select class="inputbox">
                        <option value="option1">First Interview</option>
                        <option value="option2">Treatment</option>
                        <option value="option3">Anxiety</option>
                        <option value="option4">Stress</option>
                        <option value="option5">Others</option>
                    </select>
                </div>
            </div>
            <div class="col-md-12 mb-4">
                <div class="form-control d-flex flex-column">
                    <p class="h-blue">Request:</p>
                    <textarea class="inputbox" placeholder="Write your request here" maxlength="2000"></textarea>
                </div>
            </div>
        </div>
        <div class="btn btn-primary form-control text-center">Submit</div>
    </form>
</div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

body {
    margin-top: 5%;
    background: #ecf0f3;
    font-family: 'Poppins', sans-serif;
}

.container {
    margin-top: 5%;
    background-color: #ecf0f3;
    border-radius: 15px;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
    padding: 40px 30px 30px 30px;
    font-family: 'Poppins', sans-serif;
}

.radio-btn label {
    color: #555;
}

.inputbox {
    background: none;
    border: none;
    outline: none;
    font-size: 1.2rem;
    color: #666;
    padding: 10px 15px 10px 10px;
    box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff;
    border-radius: 20px;
    width: 100%;
    font-family: 'Poppins', sans-serif;
}

.form-control {
    background: none;
    border: none;
    outline: none;
    box-shadow: none;
    font-family: 'Poppins', sans-serif;
}

.btn-primary {
    background-color:#8e44ad;
    color: #fff;
    border-radius: 25px;
    box-shadow: 3px 3px 3px #b1b1b1, -3px -3px 3px #fff;
    font-family: 'Poppins', sans-serif;
}

.btn-primary:hover {
    background-color:  #8e44ad;
    font-family: 'Poppins', sans-serif;
}

@media(max-width: 380px) {
    .container {
        margin: 30px 20px;
        padding: 40px 15px 15px 15px;
    }
}
</style>
