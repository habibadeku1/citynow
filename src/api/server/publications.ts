import { RegGuest, UserSearch, Thumb, SearchCity, Video, User, Picture, Profile, Group, CityPost, GroupCom, CityCom, Chat, MyBadge, Message, GroupPost, HeadLinePost } from './models';
import { RegGuests, UserSearchs, Thumbs, SearchCitys, Videos, Users, Pictures, Profiles, Groups, CityPosts, GroupComs, CityComs, Chats, MyBadges, Messages, GroupPosts, HeadLinePosts } from './collections';
import { publishComposite } from 'meteor/reywood:publish-composite';


publishComposite('users', function (

  pattern: string

): PublishCompositeConfig<UserSearch> {



  let selector = {};

  if (pattern) {

    selector = {
      'fsname': { $regex: pattern, $options: 'i' },
      $or: [
        { 'fname': { $regex: pattern, $options: 'i' } },
        { 'sname': { $regex: pattern, $options: 'i' } }
      ]
    };

  }

  return {

    find: () => {

      console.log(selector)

      //let pcity = Meteor.user().profile.pcity

      return UserSearchs.collection.find(selector, {


        limit: 25

      });

    },
    children: [

      <PublishCompositeConfig1<UserSearch, Thumb>>{

        find: (user) => {

          return Thumbs.collection.find(user.thumbId, {

            fields: { url: 1 }

          });

        }

      }

    ]

  };

});



Meteor.publish('userfull', function () {

  if (!this.userId) {

    return;

  }

  const profile = Users.findOne(this.userId).profile || {};

  return Pictures.collection.find({

    _id: profile.pictureId

  });

});


Meteor.publish('user', function () {

  if (!this.userId) {

    return;

  }

  const profile = Users.findOne(this.userId).profile || {};

  return Thumbs.collection.find({

    _id: profile.thumbId

  });

});


Meteor.publish('profileview', function (id: string) {

  if (!this.userId) {

    return;

  }

  const profile = Users.findOne(id).profile || {};

  return Pictures.collection.find({

    _id: profile.pictureId

  });

});


Meteor.publish('headlineposts', function (cpid: string): Mongo.Cursor<HeadLinePost> {

  if (!this.userId) {

    return;

  }

  return HeadLinePosts.collection.find({ cpid }, {

  });

});

Meteor.publish('citycoms', function (

  comId: string): Mongo.Cursor<CityCom> {

  if (!this.userId || !comId) {

    return;

  }

  return CityComs.collection.find({

    comId

  }, {

      sort: { createdAt: -1 }
    });

});


Meteor.publish('groupcoms', function (

  comId: string): Mongo.Cursor<GroupCom> {

  if (!this.userId || !comId) {

    return;

  }

  return GroupComs.collection.find({

    comId

  }, {

      sort: { createdAt: -1 }
    });

});

publishComposite('cityposts', function (citypostsBatchCounter: number): PublishCompositeConfig<CityPost> {

  //      if (!this.userId) {

  //        return;

  //      }


  return {

    find: () => {

      return CityPosts.collection.find({}, {

        sort: { upDate: -1 },
        limit: 30 * citypostsBatchCounter
      });

    },

    children: [

      <PublishCompositeConfig1<CityPost, User>>{

        find: (citypost) => {

          return Users.collection.find({

            _id: citypost.posterid

          }, {

              fields: { profile: 1 }

            });

        },

        children: [

          <PublishCompositeConfig2<CityPost, User, Picture>>{

            find: (user, citypost) => {

              return Pictures.collection.find(user.profile.pictureId, {

                fields: { url: 1 }

              });

            }

          }

        ]

      },

      <PublishCompositeConfig1<CityPost, CityCom>>{

        find: (citypost) => {

          return CityComs.collection.find({ comId: citypost._id });

        }

      },

      <PublishCompositeConfig1<CityPost, HeadLinePost>>{

        find: (citypost) => {

          return HeadLinePosts.collection.find({ cpid: citypost.cpid });

        }

      }

    ]

  };

});

publishComposite('chats', function (): PublishCompositeConfig<Chat> {

  if (!this.userId) {

    return;

  }

  return {

    find: () => {

      return Chats.collection.find({ memberIds: this.userId });

    },

    children: [

      <PublishCompositeConfig1<Chat, MyBadge>>{

        find: (chat) => {

          return MyBadges.collection.find({ badgerefid: chat._id, memberId: this.userId }, {

          });

        }

      },

      <PublishCompositeConfig1<Chat, Message>>{

        find: (chat) => {

          return Messages.collection.find({ chatId: chat._id }, {

            sort: { createdAt: -1 },

            limit: 1

          });

        }

      },

      <PublishCompositeConfig1<Chat, User>>{

        find: (chat) => {

          return Users.collection.find({

            _id: { $in: chat.memberIds }

          }, {

              fields: { profile: 1 }

            });

        },

        children: [

          <PublishCompositeConfig2<Chat, User, Picture>>{

            find: (user, chat) => {

              return Pictures.collection.find(user.profile.pictureId, {

                fields: { url: 1 }

              });

            }

          }

        ]

      }

    ]

  };

});

Meteor.publish('messages', function (

  chatId: string,

  messagesBatchCounter: number): Mongo.Cursor<Message> {

  if (!this.userId || !chatId) {

    return;

  }

  return Messages.collection.find({

    chatId

  }, {

      sort: { createdAt: -1 },

      limit: 30 * messagesBatchCounter

    });

});

Meteor.publish('group', function (id: string) {

  if (!this.userId) {

    return;

  }
  return Groups.find({ followIds: { $in: [Accounts.user()._id] }, _id: id });


});


publishComposite('groups', function (): PublishCompositeConfig<Group> {

  if (!this.userId) {

    return;

  }

  return {

    find: () => {

      return Groups.collection.find({}, {

      });

    },

    children: [

      <PublishCompositeConfig1<Group, MyBadge>>{

        find: (group) => {

          return MyBadges.collection.find({ badgerefid: group._id }, {

          });

        }

      },

      <PublishCompositeConfig1<Group, GroupPost>>{

        find: (group) => {

          return GroupPosts.collection.find({ cpid: group._id }, {

            sort: {},

            //  limit: 1

          });

        }

      }

    ]

  };

});

publishComposite('groupposts', function (grouppostsBatchCounter: number): PublishCompositeConfig<GroupPost> {

  if (!this.userId) {

    return;

  }

  return {

    find: () => {

      return GroupPosts.collection.find({}, {

        sort: { upDate: -1 },
        limit: 30 * grouppostsBatchCounter
      });
    },

    children: [

      <PublishCompositeConfig1<GroupPost, User>>{

        find: (grouppost) => {

          return Users.collection.find({

            _id: grouppost.posterid

          }, {

              fields: { profile: 1 }

            });

        }

      },

      <PublishCompositeConfig1<GroupPost, GroupCom>>{

        find: (grouppost) => {

          return GroupComs.collection.find({ comId: grouppost._id });

        }

      },

      <PublishCompositeConfig1<GroupPost, Picture>>{

        find: (grouppost) => {

          return Pictures.collection.find(grouppost.posterpictureId, {

            fields: { url: 1 }

          });

        }

      }

    ]

  };

});


Meteor.publish('checkcitypost', function (id: string): Mongo.Cursor<CityPost> {

  return CityPosts.collection.find(

    {  }
  );

});


Meteor.publish('checkgrouppost', function (id: string): Mongo.Cursor<GroupPost> {

  return GroupPosts.collection.find(

    {  }
  );

});

Meteor.publish('checkcitypostlove', function (): Mongo.Cursor<CityPost> {

  return CityPosts.collection.find(

    { loveusersId: this.userId }
  );

});

Meteor.publish('checkcitypostgood', function (): Mongo.Cursor<CityPost> {

  return CityPosts.collection.find(

    { goodusersId: this.userId }
  );

});

Meteor.publish('checkcitypostnotgood', function (): Mongo.Cursor<CityPost> {

  return CityPosts.collection.find(

    { notgoodusersId: this.userId }
  );

});

Meteor.publish('checkheadpostlove', function (): Mongo.Cursor<HeadLinePost> {

  return HeadLinePosts.collection.find(

    { loveusersId: this.userId }
  );

});

Meteor.publish('checkheadpostgood', function (): Mongo.Cursor<HeadLinePost> {

  return HeadLinePosts.collection.find(

    { goodusersId: this.userId }
  );

});

Meteor.publish('checkheadpostnotgood', function (): Mongo.Cursor<HeadLinePost> {

  return HeadLinePosts.collection.find(

    { notgoodusersId: this.userId }
  );

});

Meteor.publish('checkgrouppostlove', function (): Mongo.Cursor<GroupPost> {

  return GroupPosts.collection.find(

    { loveusersId: this.userId }
  );

});

Meteor.publish('checkgrouppostgood', function (): Mongo.Cursor<GroupPost> {

  return GroupPosts.collection.find(

    { goodusersId: this.userId }
  );

});

Meteor.publish('checkgrouppostnotgood', function (): Mongo.Cursor<GroupPost> {

  return GroupPosts.collection.find(

    { notgoodusersId: this.userId }
  );

});

Meteor.publish('videos', function (): Mongo.Cursor<Video> {

  return Videos.collection.find(

    {}
  );

});


Meteor.publish('chatbadge', function (type: string) {

  return MyBadges.collection.find({ memberId: this.userId, type: type }, { fields: {} })

});


Meteor.publish('cbadge', function (pcity: string) {

  return MyBadges.collection.find({ badgerefid: pcity, memberId: this.userId }, { fields: {} })

});

Meteor.publish('gbadge', function (type: string) {

  return MyBadges.collection.find({ memberId: this.userId, type: type }, { fields: {} })

});


//      Meteor.publish('postsearch', function(type: string) {

// return CityPosts.collection.find({_id:'834983434'}, {  limit: 10, sort: {updescr: 1}    })              
//                     });


publishComposite('postsearch', function (

  pattern: string

): PublishCompositeConfig<SearchCity> {

  let selector = {};

  if (pattern) {

    //  console.log(pattern)

    selector = {
      'alltext': { $regex: pattern, $options: 'si' },
      $or: [
        { 'alltext2': { $regex: pattern, $options: 'si' } }
      ]
    };

  }

  return {

    find: () => {

      //  console.log(selector)

      return SearchCitys.collection.find(selector, {

        limit: 20, sort: { alltext: 1 }

      });

    }

  };

});

Meteor.publish('plist', function () {


  return CityPosts.collection.find({ approved: false }, { sort: { createdAt: 1 } });

});

Meteor.publish('glist', function () {
  
  
    return GroupPosts.collection.find({ approved: false }, { sort: { createdAt: 1 } });
  
  });

Meteor.publish('checkguest', function (): Mongo.Cursor<RegGuest> {

  return RegGuests.collection.find(

    {  }
  );

});

Meteor.publish('checkmsg', function(msgid: string): Mongo.Cursor<Message> {
  
      
    return Messages.collection.find({_id:msgid,senderId:this.userId });
  
});


publishComposite('uonline', function(): PublishCompositeConfig<User> {
  
    if (!this.userId) {
  
      return;
  
    }
  
    return {
  
      find: () => {
  
        return Users.collection.find({"status.online": true});
  
      },
  
      children: [
    
        <PublishCompositeConfig1<User, Picture>> {
  
          find: (user) => {
  
            return Pictures.collection.find({
              
                  _id: user.profile.pictureId
              
                });
  
          }
        }    
  
      ]
  
    };
  
  });



