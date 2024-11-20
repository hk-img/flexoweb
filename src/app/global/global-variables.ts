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
    {
      name: 'Meeting Room',
      id: 6,
      column_name: 'meeting_room_price',
      desc: `Well-equipped meeting rooms by the hour`,
    },
    {
      name: 'Training Room/Event Space',
      id: 7,
      column_name: 'training_room_price',
      desc: `Adaptable and aesthetic space by the hour`,
    },
    {
      name: "Day pass",
      id: 8,
      column_name: "originalPrice"
    },
    {
      name:"Not sure",
      id:9,
      column_name:""
    }
  ],
  testimonials: [
    {
      id: 1,
      name: `Rakhshin Patel`,
      designation: `MD, Pi Communications`,
      content: `When we took a decision to move into a co-working space, we could not have found a better guide and friend than Flexo and Vivek. A potentially exhausting process was wrapped up in two days with efficiency and empathy. Vivek also helped us through the entire journey of negotiations, standing by us to get us better benefits. May the saplings they plant for every successful closure turn into a forest.`,
      image: `rakhshin.jpg`,
    },
    {
      id: 2,
      name: `Sophia Sandhu`,
      designation: `Screenwriter, Freelance
      `,
      content: `Flexo found me an private office space perfect for my needs and saved me the hassle of wasted time and dreaded searches on my own. They made it easy for me and it was for free!`,
      image: `Sophia.jpg`,
    },
    {
      id: 3,
      name: `Vyoma Vyas`,
      designation: `Category Manager, Beauty
      `,
      content: `Working out of a flexible office helps break the monotony of WFH and makes a person more productive. Flexo has provided much needed relief in this pandemic. `,
      image: `Vyoma.jpeg`,
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
    { id: 33, name: 'Showers' },
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
      case address_length >=  4:
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
