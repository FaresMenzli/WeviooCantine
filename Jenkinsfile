pipeline {
    agent any

    tools { 
        maven 'M2_HOME' 
        nodejs '20.11.0'
       
    }
    stages {
     
       
     
        stage('Git Checkout') {
            steps {
         
             git branch: env.BRANCH_NAME , url: 'https://github.com/FaresMenzli/WeviooCantine.git'
            }

           
        }
    
         stage('Clean App Directory') {
            steps {
                
                dir('app/PFE-Back') {
                   
                    sh 'mvn clean'
                }
            }
        }
          stage('mvn install') {
            steps {
                
                dir('app/PFE-Back') {
                   
                    sh 'mvn install'
                }
            }
        }
        //   stage('sonarQube') {
        //     steps {
                
        //         dir('app/PFE-Back') {
                   
        //             sh 'mvn sonar:sonar -Dsonar.login=admin -Dsonar.password=22141423+fF'
        //         }
        //     }
        // }
          stage('Compilation Backend') {
            steps {
                
                dir('app/PFE-Back') {
                   
                    sh 'mvn clean package'
                }
            }
        } 
        // stage('Tests Unitaires Backend') {
        //     steps {
                
        //         dir('app/PFE-Back') {
                   
        //             sh 'mvn test'
        //         }
        //     }
        // }
        
        
          stage('Compilation Frontend') {
            steps {
                
                dir('app/PFE-Back') {
                   
                    sh 'npm install && npm run build'
                }
            }
        } 
        stage('Tests Unitaires Frontend') {
            steps {
                
                dir('app/PFE-Back') {
                   
                    echo 'npm test'
                }
            }
        } 
        
         stage("kill previous backend container"){
            steps{
                script {
                   
                    def backendImageName = "wevioo-cantine-backend-image"
                    def backendContainerExists = sh(script: "docker ps -q --filter ancestor=${backendImageName}", returnStdout: true)
                    def backendContainerId = sh(script: "docker ps -q --filter ancestor=${backendImageName}", returnStdout: true).trim()
                    echo "name : '${backendImageName}' , id :'${backendContainerId}' exists: '${backendContainerExists}'"
                    if (backendContainerExists) {
                        echo "Container '${backendImageName}' exists. Removing it..."
                        sh "docker rm -f ${backendContainerId}"
                    } else {
                        echo "Container '${backendImageName}' does not exist."
                    }
                
                }
                
            }
            
        }
      
        stage('Construction Docker (Backend)') {
            steps {
                
                dir('app/PFE-Back') {
                   
                    sh 'docker build -t wevioo-cantine-backend-image .'
                }
            }
        } 
            stage("kill previous frontend container"){
            steps{
                  script {
                   
                    def frontendImageName = "wevioo-cantine-frontend-image"
                    def frontendContainerExists = sh(script: "docker ps -q --filter ancestor=${frontendImageName}", returnStdout: true)
                    def frontendContainerId = sh(script: "docker ps -q --filter ancestor=${frontendImageName}", returnStdout: true).trim()
                    if (frontendContainerExists) {
                        echo "Container '${frontendImageName}' exists. Removing it..."
                        sh "docker rm -f ${frontendContainerId}"
                    } else {
                        echo "Container '${frontendImageName}' does not exist."
                    }
                
                }
                
            }
            
        }
          stage('Construction Docker (Frontend)') {
            steps {
               
                   
                    sh 'docker build -t wevioo-cantine-frontend-image .'
                
            }
        } 
         stage('run the backend docker image on the server') {
            steps {
               
                 sh 'docker run -d -p 5000:5000 wevioo-cantine-backend-image'
              
            }
        }
        stage('run the frontend docker image on the server') {
            steps {
                 sh 'docker run -d -p 3000:80 wevioo-cantine-frontend-image'
              
            }
        }
        
        stage('Deploiement Docker') {
            steps {
                
                dir('app/PFE-Back') {
                   
                    echo 'docker push <image-name>'
                }
            }
        }
        stage('Étape de Déploiement sur serveur') {
            steps {
                
                dir('app/PFE-Back') {
                   
                    echo 'Utilisez un outil de déploiement comme Ansible, Kubernetes, ou simplement des scripts shell pour déployer votre application sur votre serveur de production'
                }
            }
        }
    }
}
