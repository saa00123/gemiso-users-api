<template>
    <div class="form-container">
        <h1>Update User</h1>
        <form @submit.prevent="updateUser">
            <label for="name">Name:</label>
            <input v-model="updatedUser.name" type="text" id="name" />
            <label for="email">Email:</label>
            <input v-model="updatedUser.email" type="email" id="email" />
            <!-- Other fields if needed -->
            <button type="submit" class="submit-button">Submit</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    props: {
        user: Object,
    },
    data() {
        return {
            updatedUser: { ...this.user },
        };
    },
    methods: {
        updateUser() {
            axios
                .put(`/api/users/${this.updatedUser.id}`, this.updatedUser)
                .then(() => {
                    this.$emit("user-updated");
                })
                .catch((error) => {
                    console.error("Error updating user:", error);
                });
        },
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
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 10px;
    align-items: center;
}

.form-field {
    display: contents;
}

label {
    text-align: right;
    padding-right: 10px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
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
