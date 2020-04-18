<template>
  <div>
    <b-button
      class="mb-2 ml-auto d-block"
      variant="primary"
      @click="$emit('user-create')"
    >
      Add user
    </b-button>
    <b-table
      striped
      hover
      :items="users"
      :fields="userFields"
    >
      <template v-slot:cell(show_details)="data">
        <b-button
          variant="primary"
          @click="data.toggleDetails"
        >
          <b-icon
            v-show="!data.detailsShowing"
            aria-hidden="true"
            icon="eye-fill"
          />
          <b-icon
            v-show="data.detailsShowing"
            aria-hidden="true"
            icon="eye-slash-fill"
          />
        </b-button>
      </template>
      <template v-slot:cell(info)="data">
        <b-button
          variant="primary"
          @click="$emit('show-user-info', data.item)"
        >
          <b-icon
            aria-hidden="true"
            icon="info-square-fill"
          />
        </b-button>
      </template>
      <template v-slot:row-details="data">
        <b-table
          striped
          hover
          :items="userDetails(data.item)"
          :fields="userDetailsFields"
        >
          <template v-slot:cell(r-w-x)="data">
            <b-checkbox
              v-model.lazy="data.item['r-w-x'].r"
              class="d-inline"
              @change="$emit('change-chmod', data.item)"
            />
            <b-checkbox
              v-model="data.item['r-w-x'].w"
              class="d-inline"
              @change="$emit('change-chmod', data.item)"
            />
            <b-checkbox
              v-model="data.item['r-w-x'].x"
              class="d-inline"
              @change="$emit('change-chmod', data.item)"
            />
          </template>
        </b-table>
      </template>
    </b-table>
  </div>
</template>

<script>
  import _ from 'underscore';
  import { chmodHandler } from '../helper';

  export default {
    name: "UserTable",
    props: {
      users: {
        type: Array,
        required: true
      },
      projects: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        userFields: ['email', 'info', { key: 'show_details', label: 'Details' }],
        userDetailsFields: ['name', 'r-w-x'],
      }
    },
    methods: {
      userDetails (data) {
        const details = []
        _.each(this.projects, project => {
          _.each(project.users, user => {
            if (user.id === data.id) {
              details.push({
                name: project.name,
                user_id: user.id,
                project_id: project.id,
                'r-w-x': chmodHandler(user.chmod)
              })
            }
          })
        })
        return details
      },
    }
  }
</script>

<style scoped>

</style>
