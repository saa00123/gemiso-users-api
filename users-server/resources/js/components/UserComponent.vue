<template>
    <div>
        <h1>Users</h1>
        <ul>
            <li v-for="user in users" :key="user.id">
                {{ user.name }} - {{ user.email }}
                <button @click="deleteUser(user.id)">Delete</button>
                <button @click="selectUser(user)">Edit</button>
            </li>
        </ul>

        <div>
            <input v-model="userForm.name" placeholder="Name" />
            <input v-model="userForm.email" placeholder="Email" />
            <button @click="createUser">Add User</button>
            <button v-if="editing" @click="updateUser">Update User</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            users: [],
            userForm: {
                name: "",
                email: "",
            },
            editing: false,
            selectedUserId: null,
        };
    },
    mounted() {
        this.loadUsers();
    },
    methods: {
        loadUsers() {
            axios
                .get("/api/users")
                .then((response) => {
                    this.users = response.data;
                })
                .catch((error) => {
                    console.error("Error loading users:", error);
                });
        },
        createUser() {
            axios
                .post("/api/users", this.userForm)
                .then(() => {
                    this.loadUsers();
                    this.userForm.name = "";
                    this.userForm.email = "";
                })
                .catch((error) => {
                    console.error("Error creating user:", error);
                });
        },
        selectUser(user) {
            this.editing = true;
            this.selectedUserId = user.id;
            this.userForm.name = user.name;
            this.userForm.email = user.email;
        },
        updateUser() {
            axios
                .put(`/api/users/${this.selectedUserId}`, this.userForm)
                .then(() => {
                    this.loadUsers();
                    this.editing = false;
                    this.userForm.name = "";
                    this.userForm.email = "";
                })
                .catch((error) => {
                    console.error("Error updating user:", error);
                });
        },
        deleteUser(id) {
            axios
                .delete(`/api/users/${id}`)
                .then(() => {
                    this.loadUsers();
                })
                .catch((error) => {
                    console.error("Error deleting user:", error);
                });
        },
    },
};
</script>
