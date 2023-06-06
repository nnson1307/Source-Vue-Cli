<script>
import MasterLayout from '../Layout/MasterLayout.vue';
import HrefLink from '@/components/HrefLink.vue';

export default {
    components: {
        MasterLayout,
        HrefLink
    },
    data() {
        return {
            messageError: null,
            full_name: null,
            email: null,
            password: null,

            // dataRow: [
            //     {
            //         'full_name': 'Sơn',
            //         'email': 'son@gmail.com',
            //         'error_full_name': '',
            //         'error_email': ''
            //     },
            //     {
            //         'full_name': 'Sơn 1',
            //         'email': 'son1@gmail.com',
            //         'error_full_name': '',
            //         'error_email': ''
            //     }
            // ]
        }
    },
    methods: {
        save() {
            axios({
                method: 'POST',
                url: '/api/users',
                headers: {
                    'Authorization': 'Bearer ' + $cookies.get('user').access_token
                },
                data: {
                    name: this.full_name,
                    email: this.email,
                    password: this.password,
                }
            }).then(function (res) {
                if (res.data.status == 422) {
                    var messageError = '';

                    if (typeof res.data.erros.email !== 'undefined') {
                        messageError += res.data.erros.email[0] + '<br/>';
                    }

                    if (typeof res.data.erros.name !== 'undefined') {
                        messageError += res.data.erros.name[0] + '<br/>';
                    }

                    if (typeof res.data.erros.password !== 'undefined') {
                        messageError += res.data.erros.password[0] + '<br/>';
                    }

                    this.messageError = messageError;

                    Swal.fire({
                        icon: 'error',
                        title: 'Create user',
                        html: messageError,
                    });
                } else if (res.data.status == 200) {
                    //Show alert create success
                    Swal.fire({
                        icon: 'success',
                        title: 'Create user',
                        text: 'Success',
                    }).then(function (result) {
                        if (result.dismiss == 'esc' || result.dismiss == 'backdrop') {
                            router.push({ name: "user" });
                        }
                        if (result.value == true) {
                            router.push({ name: "user" });
                        }
                    });
                }
            }.bind(this));
        },

        //Search dynamic row in table
        // appendRow() {
            // $.map(this.dataRow, function(v, k) {
            //     v.error_full_name = '123213';
            // });

            // this.dataRow.push({
            //     'full_name': '',
            //     'email': '',
            //     'error_full_name': '',
            //     'error_email': ''
            // });
        // }
    },
    mounted() {

    },
}
</script>

<template>
    <MasterLayout>
        <template #header>
            <h4 class="fw-bold py-3 mb-4">
                <span class="text-muted fw-light">Users/</span> Create Users
            </h4>
        </template>

        <div class="card mb-4">
            <div class="card-body">
                <form>
                    <div class="mb-3">
                        <label class="form-label" for="basic-default-fullname">Full Name</label>
                        <input type="text" class="form-control" placeholder="Enter full name" v-model="full_name">
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="basic-default-fullname">Email</label>
                        <input type="text" class="form-control" placeholder="Enter email" v-model="email">
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="basic-default-fullname">Password</label>
                        <input type="password" class="form-control" placeholder="Enter password" v-model="password">
                    </div>
                </form>

                <HrefLink to="/user" class="btn btn-outline-secondary">
                    Back
                </HrefLink>

                <button type="button" class="btn btn-primary m-l-10" @click="save">
                    Save
                </button>
            </div>
        </div>

        <!-- <div class="card mb-4">
            <div class="card-body">
                <div class="table-responsive text-nowrap m-t-20">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(v, k) in dataRow">
                                <td>{{ k + 1 }}</td>
                                <td>
                                    <input type="text" class="form-control" v-model="v.full_name">

                                    <span v-text="v.error_full_name"></span>
                                </td>
                                <td>
                                    <input type="text" class="form-control" v-model="v.email">

                                    <span v-text="v.error_email"></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <button type="button" class="btn btn-primary m-t-20" @click="appendRow">
                        Add Row
                    </button>
                </div>
            </div>
        </div> -->
    </MasterLayout>
</template>