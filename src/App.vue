<template>
  <div
    id="app"
    class="py-5"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <project-table
            :projects="projects"
            :users="users"
            @change-chmod="changeChmod"
          />
        </div>
        <div class="col-md-6">
          <user-table
            :projects="projects"
            :users="users"
            @change-chmod="changeChmod"
            @show-user-info="showUserInfo"
            @user-create="$bvModal.show('user-create')"
          />
        </div>
      </div>
    </div>
    <b-modal
      id="user-view"
      :title="userInfoTitle"
    >
      <user-view :user="currentUserInfo" />
    </b-modal>
    <b-modal
      id="user-create"
      title="Create User"
      @ok="$refs.userCreate.onSubmit()"
    >
      <user-create
        ref="userCreate"
        :projects="projects"
        :user-id="users.length + 1"
        @submit="onAddUser"
      />
    </b-modal>
  </div>
</template>

<script>
  import _ from 'underscore';
  import { chmodHandler } from './helper';
  import UserView from './components/UserView';
  import UserCreate from './components/UserCreate';
  import UserTable from './components/UserTable';
  import ProjectTable from './components/ProjectTable';

  export default {
    name: 'App',
    components: { UserView, UserCreate, UserTable, ProjectTable },
    data () {
      return {
        projects: [
          {
            id: 1,
            name: 'Project name 1',
            active: true,
            users: [
              {
                id: 1,
                chmod: 6,
              }
            ],
          },
          {
            id: 2,
            name: 'Project name 2',
            active: true,
            users: [
              {
                id: 2,
                chmod: 6,
              },
              {
                id: 3,
                chmod: 6,
              },
            ],
          },
          {
            id: 3,
            name: 'Project name 3',
            active: false,
            users: [],
          },
        ],
        users: [
          {
            id: 1,
            email: 'email@mail.com',
            last_login: '12 aug 2019',
            banned: true,
          },
          {
            id: 2,
            email: 'email2@mail.com',
            last_login: '20 aug 2019',
            banned: false,
          },
          {
            id: 3,
            email: 'email3@mail.com',
            last_login: '15 aug 2019',
            banned: false,
          }
        ],
        currentUserInfo: {},
      }
    },
    computed: {
      userInfoTitle() {
        return `User ${this.currentUserInfo.email} Information`
      }
    },
    methods: {
      showUserInfo(user) {
        this.$bvModal.show('user-view')
        this.currentUserInfo = user
      },
      changeChmod(data) {
        this.$nextTick(() => {
          const project = _.find(this.projects, project => (project.id === data.project_id))
          _.map(project.users, (user) => {
            if (user.id === data.user_id) {
              user.chmod = chmodHandler(data['r-w-x'], true)
              return user
            }
            return user
          })
        })
      },
      onAddUser(form) {
       this.users.push(form.user)
        _.each(form.projects, formProject => {
          const index = _.findIndex(this.projects, project => (project.id === formProject.id))
          this.projects[index].users.push({
            id: form.user.id,
            chmod: chmodHandler(formProject['r-w-x'], true)
          })
        })
      }
    }
  };
</script>
