export const GlobalVariables = {
  resource_types: [
    {
      name: 'Private Office',
      id: 1,
      column_name: 'privatecabin_price',
      desc: `Private space for you and your team`,
    },
    {
      name: 'Managed office',
      id: 2,
      column_name: 'customized_space_price',
      desc: `Customised space for specific requirements`,
    },
    {
      name: 'Dedicated Desk',
      id: 3,
      column_name: 'desks_price',
      desc: `Fixed workstation in a shared area`,
    },
    {
      name: 'Flexible Desk',
      id: 4,
      column_name: 'flexible_desk_price',
      desc: `Any workstation in a shared area`,
    },
    {
      name: 'Virtual Office',
      id: 5,
      column_name: 'virtual_office_price',
      desc: `Premium business and mailing address`,
    },
    // {
    //   name: 'Meeting Room',
    //   id: 6,
    //   column_name: 'meeting_room_price',
    //   desc: `Well-equipped meeting rooms by the hour`,
    // },
    // {
    //   name: 'Training Room/Event Space',
    //   id: 7,
    //   column_name: 'training_room_price',
    //   desc: `Adaptable and aesthetic space by the hour`,
    // },
    {
      name: "Day pass",
      id: 8,
      column_name: "originalPrice"
    },
    {
      name: "Not sure",
      id: 9,
      column_name: ""
    }
  ],
  testimonials: [
    {
      id: 1,
      name: `Abhinav Jain`,
      designation: `Founder`,
      companyName: `Shop 101 (Acquired by Glance InMobi)`,
      content: `We were in urgent need of flex space for some of our teams. We communicated our needs to Flexo assuming that it would be a time-consuming process. However, we were delighted as the perfect space was found and booked within 24 hours and our teams started working there the very next day. Flexo’s knowledge of the flex space market and speed of execution is impressive. Highly recommend Flexo for finding and booking flex space.`,
      image: `abhinavjain.webp`,
    },
    {
      id: 2,
      name: `Rakhshin Patel`,
      designation: `Managing Director`,
      companyName: `Pi Communications`,
      content: `When we took a decision to move into a co-working space, we could not have found a better guide and friend than Flexo. Conversations with them helped us validate in our minds the benefits of such a move.Their team took care to understand our requirements and they helped us through the entire journey of negotiations, standing by us to get us better benefits. A potentially exhausting process was wrapped up in two days with efficiency and empathy.`,
      image: `rakhshin.webp`,
    },
    {
      id: 3,
      name: `Ameet Zaverii`,
      designation: `Co-Founder & CEO`,
      companyName: `Get Set Learn (An Arvind Mafatlal Group Company)`,
      content: `Finding meeting rooms for our team meetings was becoming a challenge for us. We talked to a couple of spaces but couldn't find what we were looking for. Then we approached Flexo with our requirements and in no time, our ideal meeting rooms were booked at very good discounts. The meeting rooms were fully equipped and everything that was promised was delivered. We will definitely use Flexo again for our flexible workspace requirements.`,
      image: `ameet.webp`,
    },
    {
      id: 4,
      name: `Ritesh Singh`,
      designation: `Admin Manager`,
      companyName: `Kennect Technologies`,
      content: `Flexo provided us with multiple office location suggestions, which greatly helped us in selecting the perfect office based on our needs. With Flexo, we didn’t face any issues at all. In fact, it made our work easier and helped us find an office that perfectly matched our requirements. Their team provided excellent support throughout the process, guiding us with the right options and making the experience smooth and hassle-free. What made us choose Flexo over other options was that Flexo offered multiple office choices, a seamless process, and excellent support, making it the best fit for our needs. I would definitely recommend Flexo to others because of its multiple office options, and excellent support, making finding the perfect space effortless. `,
      image: `riteshsingh.webp`,
    },
  ],
  min_price_list: [0, 500, 1000, 1500, 2000, 2500],
  max_price_list: [500, 1000, 2000, 5000, 8000, 10000, 15000],
  facilities: [
    { id: 1, name: '24x7 Access' },
    { id: 2, name: 'Valet Parking' },
    { id: 3, name: '2W Parking' },
    { id: 4, name: '4W Parking' },
    { id: 5, name: 'Mail Service' },
    { id: 6, name: 'WiFi' },
    { id: 7, name: 'Leased Line' },
    { id: 8, name: 'Locker' },
    { id: 9, name: 'Printer/Scanner/Copy' },
    { id: 10, name: 'Whiteboard' },
    { id: 11, name: 'Projector' },
    { id: 12, name: 'TV' },
    { id: 13, name: 'Computer on hire' },
    { id: 14, name: 'Power backup' },
    { id: 15, name: 'Security' },
    { id: 16, name: 'CCTV' },
    { id: 17, name: 'AC' },
    { id: 18, name: 'Tea/Coffee' },
    { id: 19, name: 'Foods And Beverages' },
    { id: 20, name: 'Pantry' },
    { id: 21, name: 'Biometric/Access Card' },
    { id: 22, name: 'Lift Access' },
    { id: 23, name: 'Night Shift' },
    { id: 24, name: 'Onsite Staff' },
    { id: 25, name: 'Reception' },
    { id: 26, name: 'Intercom Facility' },
    { id: 27, name: 'Branding Board' },
    { id: 28, name: 'Recreational Area' },
    { id: 29, name: 'Metro Connectivity' },
    { id: 30, name: 'Tech Support' },
    { id: 31, name: 'Gym' },
    { id: 32, name: 'Swimming Pool' },
    { id: 33, name: 'Showers' }, ,
    { id: 36, name: 'Printer' },
    { id: 37, name: 'Onsite Cafe' },
    { id: 39, name: 'Breakout Space' },
    { id: 40, name: 'Ergonomic Chairs' },
    { id: 41, name: 'Free Drinking Water' },
    { id: 42, name: 'Housekeeping' },
    { id: 43, name: 'Lounge / Chill-out Area' },
    { id: 44, name: 'Nap / Meditation Room' },
    { id: 45, name: "Natural Light" },
    { id: 46, name: "Pet Friendly" },
    { id: 47, name: "Phone Booth" },
    { id: 48, name: "Electric Car Plug In" },
    { id: 49, name: "Recreation Zone" },
    { id: 50, name: "Blackout Blinds" },
    { id: 51, name: "Chairs" },
    { id: 52, name: "Dressing Room" },
    { id: 53, name: "Elevator" },
    { id: 55, name: "Green Screen" },
    { id: 56, name: "Colour Backdrops" },
    { id: 57, name: "Lighting Equipment" },
    { id: 58, name: "Microphone" },
    { id: 59, name: "Sound Recording Equipment" },
    { id: 60, name: "Restrooms" },
    { id: 61, name: "Speakers" },
    { id: 62, name: "Soundproof" },
    { id: 63, name: "Video Recording Equipment" },
    { id: 64, name: "Wheelchair Accessible" }
  ],

  getCityAndLocationDetails: (address_components) => {
    let address_length = address_components.length;
    let main_address_component = address_components[0];
    let is_city = false;
    let city_name = '';
    let location_name = '';

    switch (true) {
      case address_length === 3:
        city_name = main_address_component.long_name;
        is_city = true;
        break;
      case address_length >= 4:
        if (
          main_address_component.types[0] == 'locality' &&
          address_components[1].types[0] == 'administrative_area_level_3'
        ) {
          is_city = true;
          city_name = main_address_component.long_name;
        } else {
          location_name = main_address_component.long_name;
          city_name = address_components[1].long_name;
        }
        if (
          main_address_component.types[0] == 'locality' &&
          address_components[1].types[0] == 'administrative_area_level_2'
        ) {
          if (
            main_address_component.long_name == address_components[1].long_name
          ) {
            is_city = true;
            city_name = main_address_component.long_name;
          } else {
            location_name = main_address_component.long_name;
            city_name = address_components[1].long_name;
          }
        }
        break;
      default:
        location_name = main_address_component.long_name;
        address_components.forEach((address) => {
          if (
            address?.types?.[0] == 'locality' &&
            address?.types?.[1] == 'political'
          ) {
            city_name = address.long_name;
          }
          if (address.types[0] == 'locality') {
            city_name = address.long_name;
          }
          if (address.types[0] == 'administrative_area_level_2') {
            city_name = address.long_name;
          }
        });
        break;
    }

    return {
      is_city,
      city_name,
      location_name,
    };
  },
};
