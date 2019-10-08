module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '18.191.101.12',
      username: 'ubuntu',
      pem: "~/Downloads/cnkeypair.pem"
      // password: 'server-password'
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'citynow',
    path: '~/citynow/src/api',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'http://18.191.101.12',
      MONGO_URL: 'mongodb://localhost/meteor',
    },

    // ssl: { // (optional)
    //   // Enables let's encrypt (optional)
    //   autogenerate: {
    //     email: 'email.address@domain.com',
    //     // comma separated list of domains
    //     domains: 'website.com,www.website.com'
    //   }
    // },    
    docker: {
      // change to 'kadirahq/meteord' if your app is using Meteor 1.3 or older
      image: 'abernix/meteord:node-8.4.0-base'   
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
