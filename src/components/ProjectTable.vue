<template>
  <b-table
    striped
    hover
    :items="projects"
    :fields="projectFields"
  >
    <template v-slot:cell(active)="data">
      <b-checkbox v-model="projects[data.index].active" />
    </template>
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
    <template v-slot:row-details="data">
      <b-table
        striped
        hover
        :items="projectDetails(data.item)"
        :fields="projectDetailsFields"
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
</template>

<script>
  import _ from 'underscore';
  import { chmodHandler } from '../helper';

  export default {
    name: "ProjectTable",
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
        projectFields: ['name', 'active', { key: 'show_details', label: 'Details' }],
        projectDetailsFields: ['email', 'r-w-x'],
      }
    },
    methods: {
      projectDetails (data) {
        const details = []
        _.each(data.users, (projectUser) => {
          const user = _.find(this.users, user => (user.id === projectUser.id))
          details.push({
            email: user.email,
            user_id: user.id,
            project_id: data.id,
            'r-w-x': chmodHandler(projectUser.chmod)
          })
        })
        return details
      },
    }
  }
</script>
