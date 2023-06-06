<script>
import MasterLayout from '../Layout/MasterLayout.vue';
import moment from 'moment';
import Pagination from '@/components/Pagination.vue';
import HrefLink from '@/components/HrefLink.vue';
import DetailUser from './Detail.vue';

export default {
    components: {
        MasterLayout,
        Pagination,
        HrefLink,
        DetailUser
    },
    data() {
        return {
            listDataUser: [],
            search: '',
            page: 1,
            totalPage: 4,
            perPage: 10,
            totalUser: 0,
            moment: moment,
            Pagination,
            isLoadList: false,

            infoUser: null
        }
    },
    created() {

    },
    computed: {
        getIsNewUser() {
            return `${this.page}|${this.search}`;
        },
    },
    watch: {
        //Theo dõi giám sát đối tượng thay đổi và thực thi hành động xử lý
        async getIsNewUser(newValue, oldValue) {
            const [newPage, newSearch] = newValue.split('|');
            const [oldPage, oldSearch] = oldValue.split('|');

            this.isLoadList = false;

            if (newPage != oldPage || newSearch != oldSearch) {
                //Load data user
                this.loadDataUser();

                if (newSearch != oldSearch) {
                    this.page = 1;
                } else if (newPage != oldPage) {
                    this.page = newPage;
                }
            }
        },
    },
    methods: {
        clickPaginate(pageNum) {
            this.page = pageNum;
        },
        loadDataUser: function () {
            axios({
                method: 'GET',
                url: '/api/users',
                headers: {
                    Authorization: 'Bearer ' + $cookies.get('user').access_token
                },
                params: {
                    search: this.search,
                    page: this.page
                }
            }).then(function (res) {
                if (res.data.status == 200) {
                    this.listDataUser = res.data.data
                    this.totalPage = res.data.meta.last_page
                    this.perPage = res.data.meta.per_page
                    this.totalUser = res.data.meta.total
                    this.isLoadList = true;
                }
            }.bind(this))
        },
        detail: function (userId) {
            axios({
                method: 'GET',
                url: '/api/users/' + userId,
                headers: {
                    Authorization: 'Bearer ' + $cookies.get('user').access_token
                },
            }).then(function (res) {
                if (res.data.status == 200) {
                    this.infoUser = JSON.stringify(res.data.user);

                    $('#modal-detail-user').modal('show');
                }
            }.bind(this))
        },
        remove: function (userId) {
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to remove the user?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios({
                        method: 'DELETE',
                        url: '/api/users/' + userId,
                        headers: {
                            Authorization: 'Bearer ' + $cookies.get('user').access_token
                        },
                    }).then((res) => {
                        if (res.data.status == 200) {
                            Swal.fire(
                                'Deleted!',
                                'User has been deleted.',
                                'success'
                            )

                            //Load data user
                            this.loadDataUser();
                        }
                    })
                }
            })
        }
    },
    mounted() {
        //Lấy dữ liệu sau khi đã khởi tạo DOM + đối tượng
        this.loadDataUser();
    },
}

</script>

<template>
    <MasterLayout>
        <template #header>
            <h4 class="fw-bold py-3 mb-4">
                <span class="text-muted fw-light">Users/</span> List Users
            </h4>
        </template>

        <div class="card mb-4">
            <div class="card-body">
                <div class="row">
                    <div class="input-group input-group-merge col-lg">
                        <span class="input-group-text">
                            <i class="bx bx-search"></i>
                        </span>
                        <input type="text" class="form-control" placeholder="Search..." v-model.lazy="search">
                    </div>
                    <div class="col-lg text-align-right">
                        <HrefLink to="/user/create" class="btn btn-icon btn-outline-secondary" icon="bx-user-plus">
                        </HrefLink>
                    </div>
                </div>

                <div class="table-responsive text-nowrap m-t-20">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="totalUser > 0" v-for="(v, k) in listDataUser">
                                <td>{{ this.page > 1 ? k + 1 + ((this.page - 1) * this.perPage) : k + 1 }}</td>
                                <td>
                                    <a href="javascript:void(0)" @click="detail(v.id)">
                                        {{ v.name }}
                                    </a>
                                </td>
                                <td>{{ v.email }}</td>
                                <td>{{ moment(v.created_at).format('DD/MM/YYYY HH:mm:ss') }} </td>
                                <td>
                                    <HrefLink :to="'/user/edit/' + v.id" class="btn btn-icon btn-secondary" icon="bx-edit">
                                    </HrefLink>

                                    <a href="javascript:void(0)" class="btn btn-icon btn-secondary"
                                        style="margin-left: 5px;" @click="remove(v.id)">
                                        <span class="tf-icons bx bx-trash"></span>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="m-t-20">
                    <Pagination v-if="totalUser > 0" :page-count="this.totalPage" :page-range="5" :margin-pages="2"
                        :click-handler="clickPaginate" :prev-text="'Prev'" :next-text="'Next'"
                        :container-class="'pagination'" :page-class="'page-item'" :first-last-button="true"
                        :current-page="this.page" :is-load-list="isLoadList">
                    </Pagination>
                </div>
            </div>
        </div>

        <div id="my-modal">
            <DetailUser :info-user="infoUser"></DetailUser>
        </div>
    </MasterLayout>
</template>

