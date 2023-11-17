<template>
    <div class="form-container">
        <h1>Update User</h1>
        <form @submit.prevent="updateUser">
            <div class="form-field">
                <label for="name">Name:</label>
                <input v-model="updatedUser.name" type="text" id="name" />
            </div>
            <div class="form-field">
                <label for="email">Email:</label>
            </div>
            <input v-model="updatedUser.email" type="email" id="email" />
            <button type="submit" class="submit-button">Submit</button>
        </form>
    </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
    props: {
        user: Object,
    },
    setup(props, { emit }) {
        const updatedUser = ref({ ...props.user });

        const updateUser = async () => {
            try {
                await axios.put(
                    `/api/users/${updatedUser.value.id}`,
                    updatedUser.value
                );
                emit("user-updated");
            } catch (error) {
                console.error("Error updating user:", error);
            }
        };

        return {
            updatedUser,
            updateUser,
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
