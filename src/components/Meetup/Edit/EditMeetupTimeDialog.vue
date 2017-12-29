<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn accent slot="activator">
      <v-icon left>edit</v-icon>
      Edit Time
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup Time</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker v-model="editableTime" format="24hr" style="width: 100%" actions>
              <template slot-scope="{save, cancel}">
                <v-btn raised @click="editDialog = false">Close</v-btn>
                <v-btn raised class="error" @click="onSaveChanges">Save</v-btn>
              </template>
            </v-time-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['meetup'],
    data () {
      return {
        editableTime: '',
        editDialog: false
      }
    },
    methods: {
      onSaveChanges () {
        this.editDialog = false
        const newDate = new Date(this.meetup.date)
        let hours = this.editableTime.match(/^(\d+)/)[1]
        let minutes = this.editableTime.match(/:(\d+)/)[1]
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          date: newDate
        })
      }
    },
    attached () {
      this.editableTime = new Date(this.meetup.date).toTimeString()
    }
  }
</script>
