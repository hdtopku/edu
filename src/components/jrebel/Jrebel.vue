<template>
  <div>
    <long-link></long-link>
  </div>
</template>

<script>
import Card from './Card'
import LongLink from '../applemusic/LongLink'
import AppleMusic from '../applemusic/AppleMusic'
export default {
  components: { LongLink, Card, AppleMusic },
  data () {
    return {
    }
  },
  methods: {
    copyJetBrain: function () {
      this.$copyText().then((e) => {
        // success
        this.openCenter()
      }, (e) => {
        // fail
      })
    },
    getJetBrains: function () {
      // 2020-12-04至
      // `812LFWMRSH-eyJsaWNlbnNlSWQiOiI4MTJMRldNUlNIIiwibGljZW5zZWVOYW1lIjoi5q2j54mIIOaOiOadgyIsImFzc2lnbmVlTmFtZSI6IiIsImFzc2lnbmVlRW1haWwiOiIiLCJsaWNlbnNlUmVzdHJpY3Rpb24iOiIiLCJjaGVja0NvbmN1cnJlbnRVc2UiOmZhbHNlLCJwcm9kdWN0cyI6W3siY29kZSI6IklJIiwiZmFsbGJhY2tEYXRlIjoiMjAxOS0wNC0yMSIsInBhaWRVcFRvIjoiMjAyMC0wNC0yMCJ9LHsiY29kZSI6IkFDIiwiZmFsbGJhY2tEYXRlIjoiMjAxOS0wNC0yMSIsInBhaWRVcFRvIjoiMjAyMC0wNC0yMCJ9LHsiY29kZSI6IkRQTiIsImZhbGxiYWNrRGF0ZSI6IjIwMTktMDQtMjEiLCJwYWlkVXBUbyI6IjIwMjAtMDQtMjAifSx7ImNvZGUiOiJQUyIsImZhbGxiYWNrRGF0ZSI6IjIwMTktMDQtMjEiLCJwYWlkVXBUbyI6IjIwMjAtMDQtMjAifSx7ImNvZGUiOiJHTyIsImZhbGxiYWNrRGF0ZSI6IjIwMTktMDQtMjEiLCJwYWlkVXBUbyI6IjIwMjAtMDQtMjAifSx7ImNvZGUiOiJETSIsImZhbGxiYWNrRGF0ZSI6IjIwMTktMDQtMjEiLCJwYWlkVXBUbyI6IjIwMjAtMDQtMjAifSx7ImNvZGUiOiJDTCIsImZhbGxiYWNrRGF0ZSI6IjIwMTktMDQtMjEiLCJwYWlkVXBUbyI6IjIwMjAtMDQtMjAifSx7ImNvZGUiOiJSUzAiLCJmYWxsYmFja0RhdGUiOiIyMDE5LTA0LTIxIiwicGFpZFVwVG8iOiIyMDIwLTA0LTIwIn0seyJjb2RlIjoiUkMiLCJmYWxsYmFja0RhdGUiOiIyMDE5LTA0LTIxIiwicGFpZFVwVG8iOiIyMDIwLTA0LTIwIn0seyJjb2RlIjoiUkQiLCJmYWxsYmFja0RhdGUiOiIyMDE5LTA0LTIxIiwicGFpZFVwVG8iOiIyMDIwLTA0LTIwIn0seyJjb2RlIjoiUEMiLCJmYWxsYmFja0RhdGUiOiIyMDE5LTA0LTIxIiwicGFpZFVwVG8iOiIyMDIwLTA0LTIwIn0seyJjb2RlIjoiUk0iLCJmYWxsYmFja0RhdGUiOiIyMDE5LTA0LTIxIiwicGFpZFVwVG8iOiIyMDIwLTA0LTIwIn0seyJjb2RlIjoiV1MiLCJmYWxsYmFja0RhdGUiOiIyMDE5LTA0LTIxIiwicGFpZFVwVG8iOiIyMDIwLTA0LTIwIn0seyJjb2RlIjoiREIiLCJmYWxsYmFja0RhdGUiOiIyMDE5LTA0LTIxIiwicGFpZFVwVG8iOiIyMDIwLTA0LTIwIn0seyJjb2RlIjoiREMiLCJmYWxsYmFja0RhdGUiOiIyMDE5LTA0LTIxIiwicGFpZFVwVG8iOiIyMDIwLTA0LTIwIn0seyJjb2RlIjoiUlNVIiwiZmFsbGJhY2tEYXRlIjoiMjAxOS0wNC0yMSIsInBhaWRVcFRvIjoiMjAyMC0wNC0yMCJ9XSwiaGFzaCI6IjEyNzk2ODc3LzAiLCJncmFjZVBlcmlvZERheXMiOjcsImF1dG9Qcm9sb25nYXRlZCI6ZmFsc2UsImlzQXV0b1Byb2xvbmdhdGVkIjpmYWxzZX0=-ti4tUsQISyJF/zfWxSHCr+IcYrX2w24JO5bUZCPIGKSi+IrgQ0RT2uum9n96o+Eob9Z1iQ9nUZ6FJdpEW5g0Exe6sw8fLrWMoLFhtCIvVgQxEEt+M7Z2xD0esmjP1kPKXZyc/i+NCxA2EO2Sec9uifqklBGP1L3xoENAw2QsIWBfttIe6EPWhbS8TIMMr2vF/S3HrN8To5Hj5lwD/t1GHgFK1uWrhsuifAiKcVzqogybzGiR1h2+yNYTMbKxP7uPCcdYMsIyrBNVRGA3IuEJgyGQTQlFbnVQoVUTGPW2tQxprmC464wMjKi40JHh27WzjOHPwgzxDaigwn4Z0EbSpA==-MIIElTCCAn2gAwIBAgIBCTANBgkqhkiG9w0BAQsFADAYMRYwFAYDVQQDDA1KZXRQcm9maWxlIENBMB4XDTE4MTEwMTEyMjk0NloXDTIwMTEwMjEyMjk0NlowaDELMAkGA1UEBhMCQ1oxDjAMBgNVBAgMBU51c2xlMQ8wDQYDVQQHDAZQcmFndWUxGTAXBgNVBAoMEEpldEJyYWlucyBzLnIuby4xHTAbBgNVBAMMFHByb2QzeS1mcm9tLTIwMTgxMTAxMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxcQkq+zdxlR2mmRYBPzGbUNdMN6OaXiXzxIWtMEkrJMO/5oUfQJbLLuMSMK0QHFmaI37WShyxZcfRCidwXjot4zmNBKnlyHodDij/78TmVqFl8nOeD5+07B8VEaIu7c3E1N+e1doC6wht4I4+IEmtsPAdoaj5WCQVQbrI8KeT8M9VcBIWX7fD0fhexfg3ZRt0xqwMcXGNp3DdJHiO0rCdU+Itv7EmtnSVq9jBG1usMSFvMowR25mju2JcPFp1+I4ZI+FqgR8gyG8oiNDyNEoAbsR3lOpI7grUYSvkB/xVy/VoklPCK2h0f0GJxFjnye8NT1PAywoyl7RmiAVRE/EKwIDAQABo4GZMIGWMAkGA1UdEwQCMAAwHQYDVR0OBBYEFGEpG9oZGcfLMGNBkY7SgHiMGgTcMEgGA1UdIwRBMD+AFKOetkhnQhI2Qb1t4Lm0oFKLl/GzoRykGjAYMRYwFAYDVQQDDA1KZXRQcm9maWxlIENBggkA0myxg7KDeeEwEwYDVR0lBAwwCgYIKwYBBQUHAwEwCwYDVR0PBAQDAgWgMA0GCSqGSIb3DQEBCwUAA4ICAQAF8uc+YJOHHwOFcPzmbjcxNDuGoOUIP+2h1R75Lecswb7ru2LWWSUMtXVKQzChLNPn/72W0k+oI056tgiwuG7M49LXp4zQVlQnFmWU1wwGvVhq5R63Rpjx1zjGUhcXgayu7+9zMUW596Lbomsg8qVve6euqsrFicYkIIuUu4zYPndJwfe0YkS5nY72SHnNdbPhEnN8wcB2Kz+OIG0lih3yz5EqFhld03bGp222ZQCIghCTVL6QBNadGsiN/lWLl4JdR3lJkZzlpFdiHijoVRdWeSWqM4y0t23c92HXKrgppoSV18XMxrWVdoSM3nuMHwxGhFyde05OdDtLpCv+jlWf5REAHHA201pAU6bJSZINyHDUTB+Beo28rRXSwSh3OUIvYwKNVeoBY+KwOJ7WnuTCUq1meE6GkKc4D/cXmgpOyW/1SmBz3XjVIi/zprZ0zf3qH5mkphtg6ksjKgKjmx1cXfZAAX6wcDBNaCL+Ortep1Dh8xDUbqbBVNBL4jbiL3i3xsfNiyJgaZ5sX7i8tmStEpLbPwvHcByuf59qJhV/bZOl8KqJBETCDJcY6O2aqhTUy+9x93ThKs1GKrRPePrWPluud7ttlgtRveit/pcBrnQcXOl1rHq7ByB8CFAxNotRUYL9IF5n3wJOgkPojMy6jetQA5Ogc8Sm7RG6vg1yow==`
    }

  }
}
</script>

<style scoped>
</style>
