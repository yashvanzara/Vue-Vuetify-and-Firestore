<template>
  <v-container mt-0>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h2 class="primary--text">Create a new Meetup</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-form>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
              name="title"
              label="Title"
              id="title"
              required
              :rules="requiredRules"
              v-model="title"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                required
                :rules="requiredRules"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="imageUrl"
                label="Image Url"
                id="image-url"
                v-model="imageUrl"
                required
                :rules="requiredRules"
              >
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-card>
                <v-card-media height="200px"
                  :src="imageUrl">

                </v-card-media>
              </v-card>

            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                v-model="description"
                :rules="requiredRules"
                multi-line
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 offset-xs1 color="primary--text">
              <h3 class="primary--text">Choose a date and time</h3>
            </v-flex>
          </v-layout>

          <v-layout row mb-2>
            <v-flex xs12 sm6 offset-sm3 offset-xs1>
              <v-date-picker v-model="date" autosave></v-date-picker>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 offset-xs1>
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
            </v-flex>
          </v-layout>

          <v-layout row mt-2 mr-0>
            <v-flex xs12 sm6 offset-sm3 offset-xs1>
              <v-btn class="primary" :disabled="!formIsValid" @click="onCreateMeetup">Create Meetup</v-btn>
            </v-flex>
          </v-layout>

        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        title: '',
        location: '',
        imageUrl: '',
        description: '',
        date: '',
        time: '',
        requiredRules: [
          (v) => !!v || 'Field is required'
        ]
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' && this.location !== '' && this.imageUrl !== '' && this.description !== ''
      },
      submittableDateTime () {
        var date = new Date()
        if (this.time === '' && this.date === '') {
          date = new Date()
        } else if (this.time === '' && this.date !== '') {
          date = new Date(this.date)
          date.setHours(new Date().getHours())
          date.setMinutes(new Date().getMinutes())
          console.log('Time empty, date not empty')
        } else if (this.time !== '' && this.date === '') {
          console.log('Date empty, time not empty')
          date = new Date()
          let hours = this.time.match(/^(\d+)/)[1]
          let minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          console.log('Both Selected')
          date = new Date(this.date)
          let hours = this.time.match(/^(\d+)/)[1]
          let minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        }
        return date
      }
    },
    methods: {
      onCreateMeetup () {
        if (!this.formIsValid) {
          return
        }
        const meetupData = {
          title: this.title,
          location: this.location,
          imageUrl: this.imageUrl,
          description: this.description,
          date: this.submittableDateTime
        }
        this.$store.dispatch('createMeetup', meetupData)
        this.$router.push('/meetups')
      }

    }

  }
</script>
