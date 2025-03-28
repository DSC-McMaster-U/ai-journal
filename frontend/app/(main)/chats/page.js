'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getAuthCookie } from '@/hooks/authentication';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@radix-ui/react-dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import { useGetChats } from '@/hooks/useChats';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function ChatsPage() {
  const { data, loading, error, getChats, getChatsWithLastMessage } = useGetChats();

  useEffect(() => {
    getChatsWithLastMessage();
  }, []);

  let rows = (data ?? []).map(ChatItemToRow);

  if (loading) {
    return (
      <div className="flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (rows.length == 0) {
    return <div className="flex justify-center text-3xl p-5">No chats yet, Start One!</div>;
  }

  return <div className="w-full border-y-[2px] border-accent">{rows}</div>;
}

const getLinkFromChat = (chat) => {
  return `/chats/${chat['id']}`;
};

const convertMessageTime = (message_time) => {
  if (message_time != null) {
    let options = {
      month: 'numeric',
      year: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Toronto'
    };

    return new Date(message_time).toLocaleString('en-US', options);
  }
  return '';
};

const ChatItemToRow = (item) => {
  return (
    <ChatRow
      lastMessage={item.content}
      lastMessageTime={convertMessageTime(item.message_time)}
      chatName={item.chat_name}
      link={getLinkFromChat(item)}
      unread={item.favorited}
    />
  );
};

function ChatRow(props) {
  let { lastMessage = null, chatName, lastMessageTime = null, link, unread = true } = props;

  const router = useRouter();

  const goToChat = () => {
    router.push(link);
  };

  if (chatName == undefined || link == undefined) {
    return <></>;
  }

  if (chatName.length > 17) {
    chatName = chatName.slice(0, 14) + '...';
  }

  return (
    <div className="flex p-5 border-y-[2px] border-accent">
      <ChatImage src="images/espressly_with_white.png" />
      <div className="w-full ml-5" onClick={goToChat}>
        <div className="flex justify-between mb-3">
          <div className="text-md self-center">{chatName}</div>
          <div className="mr-5 text-[0.75em] text-primary self-center">{lastMessageTime ?? ''}</div>
        </div>
        <div className="text-primary text-md">{lastMessage ?? ''}</div>
      </div>
      <div className="flex flex-wrap content-around justify-center">
        <UnreadIndicator unread={unread} className="" />
        <ChatOptions />
      </div>
    </div>
  );
}

function ChatImage(props) {
  return <img className="w-[15vw] h-[15vw] rounded-full" src={props.src} />;
}

function UnreadIndicator(props) {
  return (
    <div
      className={
        (props.unread ? 'bg-sky-500' : 'bg-base') +
        ' w-[2vw] h-[2vw] rounded-full ' +
        (props.className ?? '')
      }
    />
  );
}

function ChatOptions(props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="w-full" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={(e) => {}} className="cursor-pointer">
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => {}} className="cursor-pointer text-destructive">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function GetTestChats() {
  return [
    {
      lastMessage: 'Let’s catch up soon!',
      lastMessageTime: '03/18 6:45 PM',
      chat_name: 'Old Friends',
      link: '/chats/4821093745',
      unread: true
    },
    {
      lastMessage: 'Meeting rescheduled to tomorrow.',
      lastMessageTime: '03/16 11:15 AM',
      chat_name: 'Work Updates',
      link: '/chats/9283746521',
      unread: false
    },
    {
      chat_name: 'Family Group',
      link: '/chats/7159364820',
      unread: true
    },
    {
      lastMessage: 'Can you send me the document?',
      lastMessageTime: '02/28 9:45 AM',
      chat_name: 'Project A',
      link: '/chats/3948172653',
      unread: false
    },
    {
      chat_name: 'Weekend Vibes',
      link: '/chats/6051948736',
      unread: false
    },
    {
      lastMessage: 'Don’t forget about the meeting.',
      lastMessageTime: '03/21 8:00 AM',
      chat_name: 'Team Check-In',
      link: '/chats/8391027465',
      unread: true
    },
    {
      lastMessage: 'How was the trip?',
      lastMessageTime: '03/19 4:20 PM',
      chat_name: 'Travel Buddies',
      link: '/chats/4702981536',
      unread: false
    },
    {
      lastMessage: 'Pizza night tomorrow?',
      lastMessageTime: '03/17 7:45 PM',
      chat_name: 'Foodies United',
      link: '/chats/9078452610',
      unread: false
    },
    {
      lastMessage: 'Can we push the deadline?',
      lastMessageTime: '03/12 10:00 AM',
      chat_name: 'Project X',
      link: '/chats/6149082753',
      unread: true
    },
    {
      lastMessage: 'What time is the party?',
      lastMessageTime: '03/11 9:15 PM',
      chat_name: 'Event Planning',
      link: '/chats/3527810946',
      unread: false
    },
    {
      lastMessage: 'Let’s plan a weekend getaway!',
      lastMessageTime: '03/09 5:30 PM',
      chat_name: 'Adventure Squad',
      link: '/chats/8273014956',
      unread: false
    },
    {
      lastMessage: 'Congrats on your new job!',
      lastMessageTime: '03/05 2:10 PM',
      chat_name: 'Career Boosters',
      link: '/chats/1938476052',
      unread: true
    },
    {
      lastMessage: 'Are we still on for lunch?',
      lastMessageTime: '03/03 1:00 PM',
      chat_name: 'Lunch Crew',
      link: '/chats/4801927356',
      unread: false
    },
    {
      lastMessage: 'Movie night was awesome!',
      lastMessageTime: '02/27 11:45 PM',
      chat_name: 'Movie Maniacs',
      link: '/chats/6049183275',
      unread: false
    },
    {
      lastMessage: 'Practice session at 6 PM.',
      lastMessageTime: '02/25 6:00 AM',
      chat_name: 'Sports Enthusiasts',
      link: '/chats/8391047265',
      unread: true
    },
    {
      lastMessage: 'Let’s brainstorm ideas.',
      lastMessageTime: '02/22 3:00 PM',
      chat_name: 'Creative Minds',
      link: '/chats/7489206153',
      unread: false
    },
    {
      lastMessage: 'How’s the new project going?',
      lastMessageTime: '02/20 7:30 PM',
      chat_name: 'Work Buddies',
      link: '/chats/9274613058',
      unread: true
    },
    {
      lastMessage: 'Thanks for your help!',
      lastMessageTime: '02/18 4:10 PM',
      chat_name: 'Support Group',
      link: '/chats/5038176249',
      unread: false
    },
    {
      lastMessage: 'When’s the next meeting?',
      lastMessageTime: '02/14 9:00 AM',
      chat_name: 'Boardroom Chats',
      link: '/chats/1049387265',
      unread: false
    },
    {
      lastMessage: 'Check out this cool article!',
      lastMessageTime: '02/12 8:45 PM',
      chat_name: 'Knowledge Hub',
      link: '/chats/8721509346',
      unread: true
    },
    {
      lastMessage: 'I’ll call you later.',
      lastMessageTime: '02/10 2:00 PM',
      chat_name: 'Close Friends',
      link: '/chats/9057214386',
      unread: false
    },
    {
      lastMessage: 'Let’s grab coffee sometime.',
      lastMessageTime: '02/08 10:20 AM',
      chat_name: 'Caffeine Lovers',
      link: '/chats/3158947206',
      unread: false
    },
    {
      lastMessage: 'Great presentation today!',
      lastMessageTime: '02/05 1:30 PM',
      chat_name: 'Work Fam',
      link: '/chats/6248173905',
      unread: true
    },
    {
      lastMessage: 'Weekend plans?',
      lastMessageTime: '02/03 5:00 PM',
      chat_name: 'Chill Squad',
      link: '/chats/9417256038',
      unread: false
    },
    {
      lastMessage: 'Any updates on the project?',
      lastMessageTime: '01/30 11:00 AM',
      chat_name: 'Deadline Hustlers',
      link: '/chats/2748960135',
      unread: true
    },
    {
      lastMessage: 'Don’t forget to RSVP!',
      lastMessageTime: '01/25 8:00 PM',
      chat_name: 'Event Invites',
      link: '/chats/6148925073',
      unread: false
    },
    {
      lastMessage: 'Missed your call, what’s up?',
      lastMessageTime: '01/20 2:15 PM',
      chat_name: 'Catch Up Crew',
      link: '/chats/4857023916',
      unread: true
    },
    {
      lastMessage: 'Let’s go for a hike!',
      lastMessageTime: '01/18 6:40 PM',
      chat_name: 'Nature Lovers',
      link: '/chats/6039174852',
      unread: false
    },
    {
      lastMessage: 'Thanks for the recipe!',
      lastMessageTime: '01/15 10:30 AM',
      chat_name: 'Food Talk',
      link: '/chats/8273014958',
      unread: true
    },
    {
      lastMessage: 'See you at the gym tomorrow!',
      lastMessageTime: '01/12 7:00 AM',
      chat_name: 'Fitness Freaks',
      link: '/chats/9304176528',
      unread: false
    }
  ];
}
