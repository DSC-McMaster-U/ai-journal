'use client';

import { useRouter } from 'next/navigation';

export default function ChatsPage() {
  const data = GetAllChats();

  let rows = data.map(ChatItemToRow);

  return <div className="w-full border-y-[2px] border-accent">{rows}</div>;
}

const ChatItemToRow = (item) => {
  return (
    <ChatRow
      lastMessage={item.lastMessage}
      lastMessageTime={item.lastMessageTime}
      chatName={item.chatName}
      link={item.link}
    />
  );
};

function ChatRow(props) {
  let { lastMessage = 'No Messages Sent Yet.', chatName, lastMessageTime, link } = props;

  if (chatName.length > 17) {
    chatName = chatName.slice(0, 14) + '...';
  }

  const router = useRouter();

  const goToChat = () => {
    router.push(link);
  };

  return (
    <div className="flex p-5 border-y-[2px] border-accent" onClick={goToChat}>
      <ChatImage src="images/espressly_with_white.png" />
      <div className="w-full ml-5">
        <div className="flex justify-between mb-3">
          <div className="text-lg self-center">{chatName}</div>
          <div className="mr-5 text-sm text-primary self-center">{lastMessageTime}</div>
        </div>
        <div className="text-primary text-md">{lastMessage}</div>
      </div>
    </div>
  );
}

function ChatImage(props) {
  return <img className="w-[15vw] h-[15vw] rounded-full" src={props.src} />;
}

function GetAllChats() {
  return [
    {
      lastMessage: 'Let’s catch up soon!',
      lastMessageTime: '03/18 6:45 PM',
      chatName: 'Old Friends',
      link: '/chat-test'
    },
    {
      lastMessage: 'Meeting rescheduled to tomorrow.',
      lastMessageTime: '03/16 11:15 AM',
      chatName: 'Work Updates',
      link: '/chat-test'
    },
    {
      lastMessage: 'Happy Birthday! 🎉',
      lastMessageTime: '03/10 3:00 PM',
      chatName: 'Family Group',
      link: '/chat-test'
    },
    {
      lastMessage: 'Can you send me the document?',
      lastMessageTime: '02/28 9:45 AM',
      chatName: 'Project A',
      link: '/chat-test'
    },
    {
      lastMessage: 'Had a great time yesterday!',
      lastMessageTime: '02/20 10:30 PM',
      chatName: 'Weekend Vibes',
      link: '/chat-test'
    },
    {
      lastMessage: 'Don’t forget about the meeting.',
      lastMessageTime: '03/21 8:00 AM',
      chatName: 'Team Check-In',
      link: '/chat-test'
    },
    {
      lastMessage: 'How was the trip?',
      lastMessageTime: '03/19 4:20 PM',
      chatName: 'Travel Buddies',
      link: '/chat-test'
    },
    {
      lastMessage: 'Pizza night tomorrow?',
      lastMessageTime: '03/17 7:45 PM',
      chatName: 'Foodies United',
      link: '/chat-test'
    },
    {
      lastMessage: 'Can we push the deadline?',
      lastMessageTime: '03/12 10:00 AM',
      chatName: 'Project X',
      link: '/chat-test'
    },
    {
      lastMessage: 'What time is the party?',
      lastMessageTime: '03/11 9:15 PM',
      chatName: 'Event Planning',
      link: '/chat-test'
    },
    {
      lastMessage: 'Let’s plan a weekend getaway!',
      lastMessageTime: '03/09 5:30 PM',
      chatName: 'Adventure Squad',
      link: '/chat-test'
    },
    {
      lastMessage: 'Congrats on your new job!',
      lastMessageTime: '03/05 2:10 PM',
      chatName: 'Career Boosters',
      link: '/chat-test'
    },
    {
      lastMessage: 'Are we still on for lunch?',
      lastMessageTime: '03/03 1:00 PM',
      chatName: 'Lunch Crew',
      link: '/chat-test'
    },
    {
      lastMessage: 'Movie night was awesome!',
      lastMessageTime: '02/27 11:45 PM',
      chatName: 'Movie Maniacs',
      link: '/chat-test'
    },
    {
      lastMessage: 'Practice session at 6 PM.',
      lastMessageTime: '02/25 6:00 AM',
      chatName: 'Sports Enthusiasts',
      link: '/chat-test'
    },
    {
      lastMessage: 'Let’s brainstorm ideas.',
      lastMessageTime: '02/22 3:00 PM',
      chatName: 'Creative Minds',
      link: '/chat-test'
    },
    {
      lastMessage: 'How’s the new project going?',
      lastMessageTime: '02/20 7:30 PM',
      chatName: 'Work Buddies',
      link: '/chat-test'
    },
    {
      lastMessage: 'Thanks for your help!',
      lastMessageTime: '02/18 4:10 PM',
      chatName: 'Support Group',
      link: '/chat-test'
    },
    {
      lastMessage: 'When’s the next meeting?',
      lastMessageTime: '02/14 9:00 AM',
      chatName: 'Boardroom Chats',
      link: '/chat-test'
    },
    {
      lastMessage: 'Check out this cool article!',
      lastMessageTime: '02/12 8:45 PM',
      chatName: 'Knowledge Hub',
      link: '/chat-test'
    },
    {
      lastMessage: 'I’ll call you later.',
      lastMessageTime: '02/10 2:00 PM',
      chatName: 'Close Friends',
      link: '/chat-test'
    },
    {
      lastMessage: 'Let’s grab coffee sometime.',
      lastMessageTime: '02/08 10:20 AM',
      chatName: 'Caffeine Lovers',
      link: '/chat-test'
    },
    {
      lastMessage: 'Great presentation today!',
      lastMessageTime: '02/05 1:30 PM',
      chatName: 'Work Fam',
      link: '/chat-test'
    },
    {
      lastMessage: 'Weekend plans?',
      lastMessageTime: '02/03 5:00 PM',
      chatName: 'Chill Squad',
      link: '/chat-test'
    },
    {
      lastMessage: 'Any updates on the project?',
      lastMessageTime: '01/30 11:00 AM',
      chatName: 'Deadline Hustlers',
      link: '/chat-test'
    },
    {
      lastMessage: 'Don’t forget to RSVP!',
      lastMessageTime: '01/25 8:00 PM',
      chatName: 'Event Invites',
      link: '/chat-test'
    },
    {
      lastMessage: 'Missed your call, what’s up?',
      lastMessageTime: '01/20 2:15 PM',
      chatName: 'Catch Up Crew',
      link: '/chat-test'
    },
    {
      lastMessage: 'Let’s go for a hike!',
      lastMessageTime: '01/18 6:40 PM',
      chatName: 'Nature Lovers',
      link: '/chat-test'
    },
    {
      lastMessage: 'Thanks for the recipe!',
      lastMessageTime: '01/15 10:30 AM',
      chatName: 'Food Talk',
      link: '/chat-test'
    },
    {
      lastMessage: 'See you at the gym tomorrow!',
      lastMessageTime: '01/12 7:00 AM',
      chatName: 'Fitness Freaks',
      link: '/chat-test'
    }
  ];
}
