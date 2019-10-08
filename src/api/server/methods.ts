import { RegGuests, UserSearchs, ReportPosts, SearchCitys, Videos, Chats, Users, GroupComs, CityComs, CityPosts, FDDPs, HeadLinePosts, MyBadges, Messages, GroupPosts, Groups } from "./collections";
import { RegGuest, UserSearch, GroupCom, CityCom, MessageType, Profile } from "./models";

import { fcmService } from "./services/fcm";


const nonEmptyString = Match.Where((str) => {

  check(str, String);

  return str.length > 0;

});


Meteor.methods({


  forceaddp(meteoruser: string) {
    FDDPs.insert({
      meteoruser: meteoruser,
      createdAt: new Date()
    })

  },

  verifyuser(user: string) {

    Meteor.users.update(
      { username: user },
      {
        $set: {
          'services.email.verificationTokens': [],
          'emails.0.verified': true
        }
      }
    )

  },

  usersearch(email: string, nname: string, fname: string, sname: string, fsname: string, mycities: string[]) {

    // console.log(Meteor.user()._id)

    UserSearchs.insert(
      {
        email: email,
        nname: nname,
        fname: fname,
        sname: sname,
        fsname: fsname,
        userid: Meteor.user()._id,
        mycities: mycities

      }
    )




  },

  regguest(did: string, dplat: string, dcord: string, pcity: string, plang: string) {
    RegGuests.insert(
      {
        did: did,
        dplat: dplat,
        dcord: dcord,
        plang: plang,
        pcity: pcity,
        createdAt: new Date()

      }
    )

  },

  regguestupdate(did: string, dplat: string, dcord: string, pcity: string, plang: string) {

    RegGuests.update({ did: did },
      {
        $set: {
          did: did,
          dplat: dplat,
          dcord: dcord, pcity: pcity, plang: plang, createdAt: new Date()
        }
      }
      , { upsert: true }
    );

  },


  approvepost(cid: string): void {

    CityPosts.update({ _id: cid },
      { $set: { approved: true } }
    )

    const cpost = CityPosts.collection.findOne({ _id: cid })

    const usercity = Users.collection.findOne({ _id: this.userId }).profile.pcity;

    const receivers = Users.collection.find({ 'profile.pcity': usercity }).fetch()

    var allids = [];

    for (var j = 0; j < receivers.length; j++) {

      allids.push(receivers[j]._id);

    }

    const userId = this.userId;

    const senderN = Users.collection.findOne({ _id: userId }).profile.fname;
    //  const memberIds = AlmChats.collection.findOne({_id: chatId}).memberIds;
    //  const almN = AlmChats.collection.findOne({_id: chatId}).alumniname
    const tokens: string[] = Users.collection.find(
      {
        _id: { $in: allids, $nin: [userId] },
        fcmToken: { $exists: true }
      }
    ).map((el) => el.fcmToken);

    for (let token of tokens) {

      console.log("Sending FCM notification");
      fcmService.sendNotification({ "title": `${"CityNow ~ " + usercity}`, "text": cpost.updescr, "tag": token }, token);

    }

    for (var i = 0; i < allids.length; i++) {

      //  console.log(allids[i])

      var exists = MyBadges.findOne({ badgerefid: usercity, memberId: allids[i] })

      if (exists) {
        MyBadges.update({ badgerefid: usercity, memberId: allids[i] },
          {
            $inc: { badgecount: 1 }
          }
        );

      }
      else if (!exists) {
        MyBadges.insert({
          badgerefid: usercity,
          memberId: allids[i],
          badgecount: 1
        }
        );
      }

    }

    SearchCitys.insert({ 

      cityname: cpost.cityname,
      citylang: cpost.citylang,
      type: "cpost",
      cpid: cpost.cpid,
      uptitle: cpost.uptitle,
      updescr: cpost.updescr,
      alltext: cpost.uptitle + " " + cpost.updescr + " " + cpost.upsource + " " + cpost.postername + " " + cpost.cityname,
      alltext2: cpost.uptitle + cpost.updescr + cpost.upsource + cpost.postername + cpost.cityname

    });



  },

  addcitypost(cityname: string, citylang: string, uptitle: string, updescr: string, upsource: string, html: string, videoid: string, picture: string, pictureId: string, thumb: string, thumbId: string, picture2: string, pictureId2: string, picture3: string, pictureId3: string, fname: string, sname: string, posterpicture: string, posterpictureId: string, posttype: string, cpid: string): void {


    console.log(cpid)

    CityPosts.insert({

      cityname: cityname,
      citylang: citylang,
      cpid: cpid,
      approved: false,
      deleted: false,
      posttype: posttype,
      uptitle: uptitle,
      updescr: updescr,
      upsource: upsource,
      html: html,
      videoid: videoid,
      pictureId: pictureId,
      picture: picture,
      thumbId: thumbId,
      thumb: thumb,
      pictureId2: pictureId2,
      picture2: picture2,
      pictureId3: pictureId3,
      picture3: picture3,
      posterid: this.userId,
      postername: fname + " " + sname,
      createdAt: new Date(),
      upDate: new Date(),
      posterpicture: posterpicture,
      posterpictureId: posterpictureId,
      comcount: 0,
      lovecount: 0,
      goodcount: 0,
      notgoodcount: 0,
      followIds: [this.userId]

    });



  },

  addgrouppost(cityname: string, citylang: string, uptitle: string, updescr: string, upsource: string, html: string, videoid: string, picture: string, pictureId: string, thumb: string, thumbId: string, picture2: string, pictureId2: string, picture3: string, pictureId3: string, fname: string, sname: string, posterpicture: string, posterpictureId: string, posttype: string, gpid: string): void {



    GroupPosts.insert({

      cityname: cityname,
      citylang: citylang,
      gpid: gpid,
      approved: false,
      deleted: false,
      posttype: posttype,
      uptitle: uptitle,
      updescr: updescr,
      html: html,
      videoid: videoid,
      upsource: upsource,
      pictureId: pictureId,
      picture: picture,
      thumbId: thumbId,
      thumb: thumb,
      pictureId2: pictureId2,
      picture2: picture2,
      pictureId3: pictureId3,
      picture3: picture3,
      posterid: this.userId,
      postername: fname + " " + sname,
      createdAt: new Date(),
      upDate: new Date(),
      posterpicture: posterpicture,
      posterpictureId: posterpictureId,
      comcount: 0,
      lovecount: 0,
      goodcount: 0,
      notgoodcount: 0,
      followIds: this.userId

    });


  },


  approvegpost(gid: string): void {


    GroupPosts.update({ _id: gid },
      { $set: { approved: true } }
    )

    const cpost = GroupPosts.collection.findOne({ _id: gid })


    const usercity = Users.collection.findOne({ _id: this.userId }).profile.pcity;

    const groupname = Groups.collection.findOne({ _id: cpost.gpid }).title

    const allids = Groups.collection.findOne({ _id: cpost.gpid }).followIds

    //   var allids=[];

    //   for (var j=0; j<receivers.length; j++){

    //    allids.push(receivers[j]);            

    //  }


    const userId = this.userId;

    const senderN = Users.collection.findOne({ _id: userId }).profile.fname;
    //  const memberIds = AlmChats.collection.findOne({_id: chatId}).memberIds;
    //  const almN = AlmChats.collection.findOne({_id: chatId}).alumniname
    const tokens: string[] = Users.collection.find(
      {
        _id: { $in: allids, $nin: [userId] },
        fcmToken: { $exists: true }
      }
    ).map((el) => el.fcmToken);

    for (let token of tokens) {

      console.log("Sending FCM notification");
      fcmService.sendNotification({ "title": `${"CityNow ~ " + usercity + "/" + groupname}`, "text": cpost.updescr, "tag": token }, token);

    }

    for (var i = 0; i < allids.length; i++) {

      //  console.log(allids[i])

      var exists = MyBadges.findOne({ badgerefid: cpost.gpid, memberId: allids[i] })

      if (exists) {
        MyBadges.update({ badgerefid: cpost.gpid, memberId: allids[i] },
          {
            $inc: { badgecount: 1 }
          }
        );

      }
      else if (!exists) {
        MyBadges.insert({
          badgerefid: cpost.gpid,
          memberId: allids[i],
          badgecount: 1,
          type: "grouppost"
        }
        );
      }
    }

    SearchCitys.insert({

      cityname: cpost.cityname,
      citylang: cpost.citylang,      
      type: "gpost",
      cpid: cpost.gpid,
      uptitle: cpost.uptitle,
      updescr: cpost.updescr,
      alltext: cpost.uptitle + " " + cpost.updescr + " " + cpost.upsource + " " + cpost.postername + " " + cpost.cityname,
      alltext2: cpost.uptitle + cpost.updescr + cpost.upsource + cpost.postername + cpost.cityname
    });


  },



  addCityCom(type: MessageType, chatId: string, senderName: string[], profilefName: string[], profilesName: string[], content: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');



    CityComs.collection.insert({

      comId: chatId,

      senderId: this.userId,

      senderName: senderName,

      profilefName: profilefName,

      profilesName: profilesName,

      content: content,

      createdAt: new Date(),

      type: type,

    })

    CityPosts.update({ _id: chatId },
      {
        $set: { upDate: new Date() },
        $push: { comusersId: this.userId },
        $inc: { comcount: 1 }
      }
      , { upsert: true }
    );


  },


  addGroupCom(type: MessageType, chatId: string, senderName: string[], profilefName: string[], profilesName: string[], content: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');



    GroupComs.collection.insert({

      comId: chatId,

      senderId: this.userId,

      senderName: senderName,

      profilefName: profilefName,

      profilesName: profilesName,

      content: content,

      createdAt: new Date(),

      type: type,

    })

    GroupPosts.update({ _id: chatId },
      {
        $set: { upDate: new Date() },
        $push: { comusersId: this.userId },
        $inc: { comcount: 1 }
      }
      , { upsert: true }
    );


  },

  addcityadminpost(cityname: string, uptitle: string, updescr: string, upsource: string, picture: string, pictureId: string, fname: string, sname: string, posterpicture: string, posterpictureId: string, posttype: string, cpid: string): void {

    CityPosts.insert({

      cpid: cpid,
      cityname: cityname,
      approved: true,
      deleted: false,
      posttype: posttype,
      uptitle: uptitle,
      updescr: updescr,
      upsource: upsource,
      pictureId: pictureId,
      picture: picture,
      posterid: this.userId,
      postername: fname + " " + sname,
      createdAt: new Date(),
      upDate: new Date(),
      posterpicture: posterpicture,
      posterpictureId: posterpictureId,
      comcount: 0,
      lovecount: 0,
      goodcount: 0,
      notgoodcount: 0,
      followIds: [this.userId]


    });

    const usercity = Users.collection.findOne({ _id: this.userId }).profile.pcity;

    const receivers = Users.collection.find({ 'profile.pcity': usercity }).fetch()

    var allids = [];

    for (var j = 0; j < receivers.length; j++) {

      allids.push(receivers[j]._id);

    }


    const userId = this.userId;

    const senderN = Users.collection.findOne({ _id: userId }).profile.fname;
    //  const memberIds = AlmChats.collection.findOne({_id: chatId}).memberIds;
    //  const almN = AlmChats.collection.findOne({_id: chatId}).alumniname
    const tokens: string[] = Users.collection.find(
      {
        _id: { $in: allids, $nin: [userId] },
        fcmToken: { $exists: true }
      }
    ).map((el) => el.fcmToken);

    for (let token of tokens) {

      console.log("Sending FCM notification");
      fcmService.sendNotification({ "title": `${"CityNow ~ " + usercity}`, "text": uptitle, "tag": token }, token);

    }

    for (var i = 0; i < allids.length; i++) {

      //  console.log(allids[i])

      var exists = MyBadges.findOne({ badgerefid: usercity, memberId: allids[i] })

      if (exists) {
        MyBadges.update({ badgerefid: usercity, memberId: allids[i] },
          {
            $inc: { badgecount: 1 }
          }
        );

      }
      else if (!exists) {
        MyBadges.insert({
          badgerefid: usercity,
          memberId: allids[i],
          badgecount: 1
        }
        );
      }

    }

    //          SearchCitys.insert ({     

    //            cityname: cityname,
    //            type: "cpost",
    //            cpid: cpid, 
    //            uptitle: uptitle,        
    //            updescr: updescr,
    //            alltext: uptitle+" "+updescr+" "+upsource+" "+fname +" " +sname+" "+cityname,
    //            alltext2: uptitle+" "+updescr+" "+upsource+" "+fname +" " +sname+" "+cityname

    //       });


  },

  addadminpost(cityname: string, uptitle: string, updescr: string, upsource: string, html: string, videoid: string, picture: string, pictureId: string, fname: string, sname: string, posterpicture: string, posterpictureId: string, posttype: string, cpid: string, hid: string): void {


    HeadLinePosts.insert({

      hid: hid,
      cpid: cpid,
      cityname: cityname,
      approved: true,
      deleted: false,
      posttype: posttype,
      uptitle: uptitle,
      updescr: updescr,
      upsource: upsource,
      html: html,
      videoid: videoid,
      pictureId: pictureId,
      picture: picture,
      posterid: this.userId,
      postername: fname + " " + sname,
      createdAt: new Date(),
      upDate: new Date(),
      posterpicture: posterpicture,
      posterpictureId: posterpictureId,
      comcount: 0,
      lovecount: 0,
      goodcount: 0,
      notgoodcount: 0,
      followIds: [this.userId]


    });


    SearchCitys.insert({

      cityname: cityname,
    //  citylang: citylang,      
      type: "cpost",
      cpid: cpid,
      uptitle: uptitle,
      updescr: updescr,
      alltext: uptitle + " " + updescr + " " + upsource + " " + fname + " " + sname + " " + cityname,
      alltext2: uptitle + " " + updescr + " " + upsource + " " + fname + " " + sname + " " + cityname

    });



  },

  updateProfile(profile: Profile): void {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');

    Meteor.users.update(this.userId, {

      $set: { profile }

    });

    UserSearchs.update({ userid: Meteor.user()._id },
      {
        $set: { thumbId: profile.thumbId, fname: profile.fname, sname: profile.sname, fsname: profile.fsname }
      }
      , { upsert: true }
    );


  }

  ,

  addChat(receiverId: string): void {

    if (!this.userId) {

      throw new Meteor.Error('unauthorized',

        'User must be logged-in to create a new chat');

    }

    check(receiverId, nonEmptyString);

    if (receiverId === this.userId) {

      throw new Meteor.Error('illegal-receiver',

        'Receiver must be different than the current logged in user');

    }

    const chatExists = !!Chats.collection.find({

      memberIds: { $all: [this.userId, receiverId] }

    }).count();



    if (chatExists) {

      throw new Meteor.Error('chat-exists',

        'Chat already exists');

    }



    const chat = {

      memberIds: [this.userId, receiverId]

    };



    Chats.insert(chat);

  },


  removeMyBadge(chatId: string): void {

    if (!this.userId) {

      throw new Meteor.Error('unauthorized',

        'User must be logged-in');

    }

    check(chatId, nonEmptyString);

    const bExists = !!MyBadges.collection.findOne({ badgerefid: chatId, memberId: this.userId });

    if (!bExists) {

      throw new Meteor.Error('does-not-exist',

        'doesn\'t exist');

    }

    MyBadges.remove({ badgerefid: chatId, memberId: this.userId }).subscribe();

  },

  addMessage(type: MessageType, chatId: string, senderName: string, profilefName: string, profilesName: string, content: string, content2: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');



    check(type, Match.OneOf(String, [MessageType.TEXT, MessageType.LOCATION]));

    check(chatId, nonEmptyString);

    check(content, nonEmptyString);

    const chatExists = !!Chats.collection.find(chatId).count();



    if (!chatExists) {

      throw new Meteor.Error('chat-not-exists',

        'Chat doesn\'t exist');

    }

    return {

      messageId: Messages.collection.insert({

        chatId: chatId,

        senderId: this.userId,

        senderName: senderName,

        profilefName: profilefName,

        profilesName: profilesName,

        content: content,

        content2: content2,

        createdAt: new Date(),

        type: type,

        isread: false

      })


    };

  },

  notifyaddMessage(type: MessageType, chatId: string, senderName: string, profilefName: string, profilesName: string, content: string) {


    const userId = this.userId;
    const cName = Users.collection.findOne({ _id: userId }).profile.pcity;
    const senderN = Users.collection.findOne({ _id: userId }).profile.fname;
    //  const senderS = Users.collection.findOne({_id: userId}).profile.sname;   
    const memberIds = Chats.collection.findOne({ _id: chatId }).memberIds;
    const tokens: string[] = Users.collection.find(
      {
        _id: { $in: memberIds, $nin: [userId] },
        fcmToken: { $exists: true }
      }
    ).map((el) => el.fcmToken);

    for (let token of tokens) {

      console.log("Sending FCM notification");
      fcmService.sendNotification({ "title": `${"CityNow ~ " + cName}`, "text": senderN + " - " + content, "tag": chatId }, token);

    }

    const receiverId = Chats.collection.findOne({ _id: chatId })
    const receiver = Users.findOne(receiverId.memberIds.find(memberId => memberId != this.userId));


    var exists = MyBadges.findOne({ badgerefid: chatId, memberId: receiver._id })

    if (exists) {
      MyBadges.update({ badgerefid: chatId, memberId: receiver._id },
        {
          $inc: { badgecount: 1 }
        }
      );

    }
    else if (!exists) {
      MyBadges.insert({
        badgerefid: chatId,
        memberId: receiver._id,
        badgecount: 1,
        type: "chat"
      }
      );
    }

  },

  pushcitypostlove(id: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');

    CityPosts.update({ _id: id },
      {
        $push: { loveusersId: this.userId },
        $inc: { lovecount: 1 }
      }
      , { upsert: true }
    );


  },

  unpushcitypostlove(id: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');

    CityPosts.update({ _id: id },
      {
        $pull: { loveusersId: this.userId },
        $inc: { lovecount: -1 }
      }
      , { upsert: true }
    );


  },


  pushcitypostgood(id: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');

    CityPosts.update({ _id: id },
      {
        $set: { upDate: new Date() },
        $push: { goodusersId: this.userId },
        $inc: { goodcount: 1 }
      }
      , { upsert: true }
    );


  },

  unpushcitypostgood(id: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');

    CityPosts.update({ _id: id },
      {
        $pull: { goodusersId: this.userId },
        $inc: { goodcount: -1 }
      }
      , { upsert: true }
    );


  },


  pushcitypostnotgood(id: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');

    CityPosts.update({ _id: id },
      {
        $push: { notgoodusersId: this.userId },
        $inc: { notgoodcount: 1 }
      }
      , { upsert: true }
    );


  },

  unpushcitypostnotgood(id: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');

    CityPosts.update({ _id: id },
      {
        $pull: { notgoodusersId: this.userId },
        $inc: { notgoodcount: -1 }
      }
      , { upsert: true }
    );


  },


  pushheadpostlove(id: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');

    HeadLinePosts.update({ _id: id },
      {
        $push: { loveusersId: this.userId },
        $inc: { lovecount: 1 }
      }
      , { upsert: true }
    );


  },

  unpushheadpostlove(id: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');

    HeadLinePosts.update({ _id: id },
      {
        $pull: { loveusersId: this.userId },
        $inc: { lovecount: -1 }
      }
      , { upsert: true }
    );


  },


  pushheadpostgood(id: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');

    HeadLinePosts.update({ _id: id },
      {
        $set: { upDate: new Date() },
        $push: { goodusersId: this.userId },
        $inc: { goodcount: 1 }
      }
      , { upsert: true }
    );


  },

  unpushheadpostgood(id: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');

    HeadLinePosts.update({ _id: id },
      {
        $pull: { goodusersId: this.userId },
        $inc: { goodcount: -1 }
      }
      , { upsert: true }
    );


  },


  pushheadpostnotgood(id: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');

    HeadLinePosts.update({ _id: id },
      {
        $push: { notgoodusersId: this.userId },
        $inc: { notgoodcount: 1 }
      }
      , { upsert: true }
    );


  },

  unpushheadpostnotgood(id: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');

    HeadLinePosts.update({ _id: id },
      {
        $pull: { notgoodusersId: this.userId },
        $inc: { notgoodcount: -1 }
      }
      , { upsert: true }
    );


  },

  pushgrouppostlove(id: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');

    GroupPosts.update({ _id: id },
      {
        $push: { loveusersId: this.userId },
        $inc: { lovecount: 1 }
      }
      , { upsert: true }
    );


  },

  unpushgrouppostlove(id: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');

    GroupPosts.update({ _id: id },
      {
        $pull: { loveusersId: this.userId },
        $inc: { lovecount: -1 }
      }
      , { upsert: true }
    );


  },


  pushgrouppostgood(id: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');

    GroupPosts.update({ _id: id },
      {
        $set: { upDate: new Date() },
        $push: { goodusersId: this.userId },
        $inc: { goodcount: 1 }
      }
      , { upsert: true }
    );


  },

  unpushgrouppostgood(id: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');

    GroupPosts.update({ _id: id },
      {
        $pull: { goodusersId: this.userId },
        $inc: { goodcount: -1 }
      }
      , { upsert: true }
    );


  },


  pushgrouppostnotgood(id: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');

    GroupPosts.update({ _id: id },
      {
        $push: { notgoodusersId: this.userId },
        $inc: { notgoodcount: 1 }
      }
      , { upsert: true }
    );


  },

  unpushgrouppostnotgood(id: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');

    GroupPosts.update({ _id: id },
      {
        $pull: { notgoodusersId: this.userId },
        $inc: { notgoodcount: -1 }
      }
      , { upsert: true }
    );


  },

  followgp(id: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');

    Groups.update({ _id: id },
      {
        $push: { followIds: this.userId }
      }
      , { upsert: true }
    );


  },

  unfollowgp(id: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');

    Groups.update({ _id: id },
      {
        $pull: { followIds: this.userId }
      }
      , { upsert: true }
    );


  },

  addvideo(url: string, city: string): void {

    Videos.insert({
      url: url,
      city: city,
    });

  },


  saveFcmToken(token: string): void {
    if (!this.userId) throw new Meteor.Error('unauthorized', 'User must be logged-in to call this method');

    check(token, nonEmptyString);

    Users.collection.update({ _id: this.userId }, { $set: { "fcmToken": token } });
  },


  removeMyBadgeCP(pcity: string): void {

    if (!this.userId) {

      throw new Meteor.Error('unauthorized',

        'User must be logged-in');

    }

    check(pcity, nonEmptyString);

    const bExists = !!MyBadges.collection.findOne({ badgerefid: pcity, memberId: this.userId });

    if (!bExists) {

      throw new Meteor.Error('does-not-exist',

        'doesn\'t exist');

    }

    MyBadges.remove({ badgerefid: pcity, memberId: this.userId }).subscribe();

  },



  removeMyBadgeGP(gpid: string): void {

    if (!this.userId) {

      throw new Meteor.Error('unauthorized',

        'User must be logged-in');

    }

    check(gpid, nonEmptyString);

    const bExists = !!MyBadges.collection.findOne({ badgerefid: gpid, memberId: this.userId });

    if (!bExists) {

      throw new Meteor.Error('does-not-exist',

        'doesn\'t exist');

    }

    MyBadges.remove({ badgerefid: gpid, memberId: this.userId }).subscribe();

  },

  deletePost(id: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');

    CityPosts.update({ cpid: id },
      {
        $set: { deleted: true }
      }
      , { upsert: true }
    );

    SearchCitys.remove({ cpid: id })


  },

  deleteGPost(id: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');

    GroupPosts.update({ gpid: id },
      {
        $set: { deleted: true }
      }
      , { upsert: true }
    );

    SearchCitys.remove({ cpid: id })

  },


  followPost(id: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');

    CityPosts.update({ _id: id },
      {
        $push: { followIds: this.userId }
      }
      , { upsert: true }
    );


  },

  unfollowPost(id: string) {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in to create a new chat');

    CityPosts.update({ _id: id },
      {
        $pull: { followIds: this.userId }
      }
      , { upsert: true }
    );


  },


  reportPost(pcity: string, plang: string, updescr: string, fname: string, sname: string, picture: string, pictureid: string, cid: string): void {

    ReportPosts.insert({
      cityname: pcity,
      citylang: plang,
      updescr: updescr,
      fname: fname,
      sname: sname,
      picture: picture,
      pictureid: pictureid,
      cpid: cid

    });

  },

  countMessages(): number {

    return Messages.collection.find().count();

  },

  countCityposts(): number {

    return CityPosts.collection.find().count();

  },

  removeChat(chatId: string): void {
    if (!this.userId) {
      throw new Meteor.Error('unauthorized',
        'User must be logged-in to remove chat');
    }

    check(chatId, nonEmptyString);

    const chatExists = !!Chats.collection.find(chatId).count();

    if (!chatExists) {
      throw new Meteor.Error('chat-not-exists',
        'Chat doesn\'t exist');
    }

    Chats.remove(chatId);
  },

  updateLangH(): void {

    if (!this.userId) throw new Meteor.Error('unauthorized',

      'User must be logged-in');

    Meteor.users.update(this.userId, {

      $set: { 'profile.plang': 'Hausa' }

    });

  },

  updateLangE(): void {
    
        if (!this.userId) throw new Meteor.Error('unauthorized',
    
          'User must be logged-in');
    
        Meteor.users.update(this.userId, {
    
          $set: { 'profile.plang': 'English' }
    
        });
    
      }

  ,

  delMsg(msgId: string): void {
    
        if (!this.userId) {
    
          throw new Meteor.Error('unauthorized',
    
            'User must be logged-in to remove chat');
    
        }
    
        check(msgId, nonEmptyString);
    
        const msgExists = !!Messages.collection.find(msgId).count();
    
        if (!msgExists) {
    
          throw new Meteor.Error('chat-not-exists',
    
            'Chat doesn\'t exist');
    
        }
    
        Messages.remove(msgId).subscribe();

        const bExists = !!MyBadges.collection.findOne({badgerefid:msgId,memberId:this.userId});
        
         //   if (!bExists) {
        
         //     throw new Meteor.Error('does-not-exist',
        
         //       'doesn\'t exist');
        
         //   }
        
            MyBadges.remove({badgerefid:msgId,memberId:this.userId}).subscribe();
    
      },






})
