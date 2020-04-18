<template>
  <b-form @submit="onSubmit">
    <b-form-group
      label="Email address"
    >
      <b-form-input
        v-model="form.user.email"
        name="email"
        type="email"
        required
        placeholder="Enter email"
      />
    </b-form-group>
    <b-form-group
      label="Project"
    >
      <b-form-select
        v-model="selectedProjects"
        name="project"
        value-field="id"
        text-field="name"
        :options="projects"
        multiple
        required
        @change="selectProject"
      />
    </b-form-group>
    <b-form-group
      v-for="(project, index) in form.projects"
      :key="project.id"
      :label="`Selected rule for ${project.name}`"
    >
      <b-checkbox
        v-model.lazy="form.projects[index]['r-w-x'].r"
        class="d-inline"
      />
      <b-checkbox
        v-model="form.projects[index]['r-w-x'].w"
        class="d-inline"
      />
      <b-checkbox
        v-model="form.projects[index]['r-w-x'].x"
        class="d-inline"
      />
    </b-form-group>
  </b-form>
</template>

<script>
  import _ from 'underscore';

  export default {
    name: "UserView",
    props: {
      projects: {
        type: Array,
        required: true
      },
      userId: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        form: {
          user: {
            id: this.userId,
            email: '',
            banned: false,
            last_login: null,
          },
          projects: []
        },
        selectedProjects: []
      }
    },
    methods: {
      selectProject (ids) {
        this.form.projects = []
        _.each(ids, id => {
          const project = _.find(this.projects, project => (project.id === id))
          this.form.projects.push({
            id, name: project.name, 'r-w-x': { r: false, w: false, x: false }
          })
        })
      },
      onSubmit () {
        this.form.user.last_login = this.getNowDateFormat()
        this.$emit('submit', this.form)
      },
      getNowDateFormat () {
        const date = new Date()
        return `${date.getDay()} ${date.toLocaleString("en", { month: "long" })} ${date.getFullYear()}`
      }
    }
  }
</script>
