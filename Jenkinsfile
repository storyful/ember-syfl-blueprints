pipeline {
  agent any

  environment {
    CODE_VERSION="${BRANCH_NAME}-${BUILD_NUMBER}"
    COMPOSE_PROJECT_NAME="ember-syfl-blueprints_${CODE_VERSION}"
    GITHUB_TOKEN = credentials('github')
  }

  stages {
    stage('Test Environment Setup') {
      steps {
        sh 'docker-compose build'
      }
    }
    stage('Run checks') {
      steps {
        parallel(
          "Run Ember tests": {
            sh 'docker-compose run ember_syfl_blueprints npm test'
          },
          "Run package audit": {
            sh 'docker-compose run ember_syfl_blueprints npm audit --audit-level=moderate'
          }
        )
      }
    }
  }
  post {
    always {
      sh 'docker-compose down --remove-orphans'
    }
  }
}
