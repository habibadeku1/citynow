import { Meteor } from 'meteor/meteor';

import { Picture, Group } from './models';

import * as moment from 'moment';

import env from 'process-env';

import { Email } from 'meteor/email';


import { Accounts } from 'meteor/accounts-base';


import { twoFactor } from 'meteor/dburles:two-factor';

import { Users, Groups } from './collections';



Meteor.startup(() => {

  process.env.MAIL_URL = "smtps://citynowng%40gmail.com:ptfinGod@smtp.gmail.com:465/";

  twoFactor.sendCode = (user, code) => {

    //state.get("")
    // Don't hold up the client
    Meteor.defer(() => {

      console.log("the code is:" + code + "user" + user.emails[0].address);
      // Send code via email
      Email.send({
        to: user.emails[0].address, // Method attached using dburles:collection-helpers
        from: 'no-reply@citynow.ng',
        subject: 'CityNow.ng authentication code',
        text: `Hello, \n\n${code} is your authentication code. \n\nBest Regards, \n\nCityNow.ng Team`
      });
    });
  };


  if (Groups.collection.find().count() == 0) {



    Groups.insert(
      {
        "title": "Politics & Government",
        "cityname": "Kaduna",
        "citylang": "English",
        "followIds": []
      }),

      Groups.insert(
        {
          "title": "Business & Investment",
          "cityname": "Kaduna",
          "citylang": "English",          
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "Jobs & Vacancies",
          "cityname": "Kaduna",
          "citylang": "English",          
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "Sports",
          "cityname": "Kaduna",
          "citylang": "English",          
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "Fashion & Beauty",
          "cityname": "Kaduna",
          "citylang": "English",          
          "followIds": []
        }),



      Groups.insert(
        {
          "title": "Education & Learning",
          "cityname": "Kaduna",
          "citylang": "English",          
          "followIds": []
        }),


      Groups.insert(
        {
          "title": "Computers & Phones",
          "cityname": "Kaduna",
          "citylang": "English",          
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "Media & Entertainment",
          "cityname": "Kaduna",
          "citylang": "English",          
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "Romance",
          "cityname": "Kaduna",
          "citylang": "English",          
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "Arts & Crafts",
          "cityname": "Kaduna",
          "citylang": "English",          
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "Hotels & Accomodation",
          "cityname": "Kaduna",
          "citylang": "English",          
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "Parks, Recreation & Places",
          "cityname": "Kaduna",
          "citylang": "English",          
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "Restaurants & Eateries",
          "cityname": "Kaduna",
          "citylang": "English",          
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "Agriculture",
          "cityname": "Kaduna",
          "citylang": "English",          
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "Events & Services",
          "cityname": "Kaduna",
          "citylang": "English",          
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "Property & Construction",
          "cityname": "Kaduna",
          "citylang": "English",          
          "followIds": []
        })

    Groups.insert(
      {
        "title": "Family & Health",
        "cityname": "Kaduna",
        "citylang": "English",        
        "followIds": []
      }),



      Groups.insert(
        {
          "title": "SIYASA DA GWAMNATI",
          "cityname": "Kaduna",
          "citylang": "Hausa",          
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "KASUWANCI DA ZUBA JARI",
          "cityname": "Kaduna",
          "citylang": "Hausa",          
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "GURABEN AIKI",
          "cityname": "Kaduna",
          "citylang": "Hausa",
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "WASANNI",
          "cityname": "Kaduna",
          "citylang": "Hausa",
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "KWALLIYA",
          "cityname": "Kaduna",
          "citylang": "Hausa",
          "followIds": []
        }),



      Groups.insert(
        {
          "title": "ILIMI",
          "cityname": "Kaduna",
          "citylang": "Hausa",
          "followIds": []
        }),


      Groups.insert(
        {
          "title": "NA’URORIN SADARWA",
          "cityname": "Kaduna",
          "citylang": "Hausa",
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "SADARWA DA NISHADI",
          "cityname": "Kaduna",
          "citylang": "Hausa",
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "SAMARTAKA",
          "cityname": "Kaduna",
          "citylang": "Hausa",
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "FASAHAR HANNU",
          "cityname": "Kaduna",
          "citylang": "Hausa",
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "MASAUKAI",
          "cityname": "Kaduna",
          "citylang": "Hausa",
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "KILISA DA SHAKATAWA",
          "cityname": "Kaduna",
          "citylang": "Hausa",
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "WURAREN CIN ABINCI",
          "cityname": "Kaduna",
          "citylang": "Hausa",
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "NOMA",
          "cityname": "Kaduna",
          "citylang": "Hausa",
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "SHAGULGULA DA MAKAMANTAN SU",
          "cityname": "Kaduna",
          "citylang": "Hausa",
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "MUHALLI DA GINE-GINE",
          "cityname": "Kaduna",
          "citylang": "Hausa",
          "followIds": []
        })

    Groups.insert(
      {
        "title": "KIWON LAFIYA DA IYALI",
        "cityname": "Kaduna",
        "citylang": "Hausa",
        "followIds": []
      }),



      Groups.insert(
        {
          "title": "Politics & Government",
          "cityname": "Abuja",
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "Business & Investment",
          "cityname": "Abuja",
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "Jobs & Vacancies",
          "cityname": "Abuja",
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "Sports",
          "cityname": "Abuja",
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "Fashion & Beauty",
          "cityname": "Abuja",
          "followIds": []
        }),



      Groups.insert(
        {
          "title": "Education & Learning",
          "cityname": "Abuja",
          "followIds": []
        }),


      Groups.insert(
        {
          "title": "Computers & Phones",
          "cityname": "Abuja",
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "Media & Entertainment",
          "cityname": "Abuja",
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "Romance",
          "cityname": "Abuja",
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "Arts & Crafts",
          "cityname": "Abuja",
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "Hotels & Accomodation",
          "cityname": "Abuja",
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "Parks, Recreation & Places",
          "cityname": "Abuja",
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "Restaurants & Eateries",
          "cityname": "Abuja",
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "Agriculture",
          "cityname": "Abuja",
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "Events & Services",
          "cityname": "Abuja",
          "followIds": []
        }),

      Groups.insert(
        {
          "title": "Property & Construction",
          "cityname": "Abuja",
          "followIds": []
        })

    Groups.insert(
      {
        "title": "Family & Health",
        "cityname": "Abuja",
        "followIds": []
      }),

      Groups.insert(
        {
          "title": "Family & Health",
          "cityname": "Abuja",
          "followIds": []
        })

  }






});

function importPictureFromUrl(options: { name: string, url: string }): Picture {

  const description = { name: options.name };

  return Meteor.call('ufsImportURL', options.url, description, 'pictures');

}

