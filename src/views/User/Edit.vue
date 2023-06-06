<script>
import MasterLayout from '../Layout/MasterLayout.vue';
import HrefLink from '@/components/HrefLink.vue';

export default {
    components: {
        MasterLayout,
        HrefLink
    },
    props: {

    },
    data() {
        return {
            userId: null,
            messageError: null,
            full_name: null,
            email: null,
        }
    },
    methods: {
        save() {
            axios({
                method: 'PUT',
                url: '/api/users/' + this.userId,
                headers: {
                    'Authorization': 'Bearer ' + $cookies.get('user').access_token
                },
                data: {
                    name: this.full_name,
                    email: this.email,
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
                        title: 'Edit user',
                        html: messageError,
                    });
                } else if (res.data.status == 200) {
                    //Show alert create success
                    Swal.fire({
                        icon: 'success',
                        title: 'Edit user',
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
        }
    },
    mounted() {
        this.userId = this.$route.params.id;

        //Load info user
        axios({
            method: 'GET',
            url: '/api/users/' + this.$route.params.id,
            headers: {
                Authorization: 'Bearer ' + $cookies.get('user').access_token
            },

        }).then(function (res) {
            if (res.data.status == 200) {
                this.full_name = res.data.user.name
                this.email = res.data.user.email
            }
        }.bind(this))

    },
}
</script>

<template>
    <MasterLayout>
        <template #header>
            <h4 class="fw-bold py-3 mb-4">
                <span class="text-muted fw-light">Users/</span> Edit Users
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
                </form>

                <HrefLink to="/user" class="btn btn-outline-secondary">
                    Back
                </HrefLink>

                <button type="button" class="btn btn-primary m-l-10" @click="save">
                    Save
                </button>
            </div>
        </div>
    </MasterLayout>
</template>