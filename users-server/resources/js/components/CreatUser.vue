<template>
    <div class="form-container">
        <button class="close-button" @click="closeForm">✖</button>
        <h1>Create User</h1>
        <form @submit.prevent="createUser">
            <div class="form-field">
                <label for="name">Name:</label>
                <input
                    v-model="newUser.name"
                    type="text"
                    id="name"
                    placeholder="Name"
                />
            </div>
            <div class="form-field">
                <label for="email">Email:</label>
                <input
                    v-model="newUser.email"
                    type="email"
                    id="email"
                    placeholder="Email"
                />
            </div>
            <button type="submit" class="submit-button">Submit</button>
        </form>
    </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
    emits: ["close-form"],
    setup(props, { emit }) {
        const newUser = ref({
            name: "",
            email: "",
        });

        const createUser = async () => {
            try {
                await axios.post("/api/users", newUser.value);
                newUser.value = { name: "", email: "" };
                emit("user-created");
            } catch (error) {
                console.error("Error creating user:", error);
            }
        };

        const closeForm = () => {
            emit("close-form");
        };

        return {
            newUser,
            createUser,
            closeForm,
        };
    },
};
</script>

<style>
.form-container {
    position: relative;
    width: 45%;
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.user-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.form-field {
    display: contents;
}

label {
    text-align: right;
    padding-right: 10px;
}

input[type="text"],
input[type="email"] {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 80%;
}

.submit-button {
    grid-column: 1 / span 2;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.submit-button:hover {
    background-color: #45a049;
}

.error-input {
    border-color: red;
}

.error-message {
    color: red;
    margin-top: 5px;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 20px;
}

.close-button:hover {
    color: #888;
}
</style>
