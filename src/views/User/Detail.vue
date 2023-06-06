<script>
export default {
    props: {
        infoUser: null
    },
    data() {
        return {
            full_name: null,
            email: null
        }
    },
    computed: {
        changeViewUser() {
            return `${this.infoUser}`;
        },
    },
    watch: {
        //Theo dõi giám sát đối tượng thay đổi và thực thi hành động xử lý
        async changeViewUser(newValue, oldValue) {
            const [newUser] = newValue.split('|');
            const [oldUser] = oldValue.split('|');

            var user = JSON.parse(newUser);
            
            this.full_name = user.name
            this.email = user.email
        },
    },
    mounted() {
       
    }
}
</script>

<template>
    <div class="modal fade" id="modal-detail-user" tabindex="-1" style="display: none;">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel3">Detail User</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label" for="basic-default-fullname">Full Name</label>
                        <input type="text" class="form-control" placeholder="Enter full name" v-model="this.full_name">
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="basic-default-fullname">Email</label>
                        <input type="text" class="form-control" placeholder="Enter email" v-model="this.email">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>