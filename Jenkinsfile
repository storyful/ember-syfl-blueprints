pipeline {
  agent any

  environment {
    CODE_VERSION="${BRANCH_NAME}-${BUILD_NUMBER}"
    COMPOSE_PROJECT_NAME="ember-syfl-blueprints_${CODE_VERSION}"
  }

  stages {
    stage('Test Environment Setup') {
      environment {
        GITHUB_TOKEN = credentials('github')
      }
      steps {
        sh 'docker-compose build'
      }
    }
    stage('Run Ember tests') {
      steps  {
        sh 'docker-compose run ember_syfl_blueprints npm test'
      }
    }
    stage('Run package audit') {
      steps  {
        sh 'docker-compose run ember_syfl_blueprints npm audit --audit-level=moderate'
      }
    }
  }
  post {
    always {
      sh 'docker-compose down --remove-orphans'
    }
  }
}
