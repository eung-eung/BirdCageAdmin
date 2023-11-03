import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import io from "socket.io-client"

import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline'
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
const solutions = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: "Your customers' data will be safe and secure", href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]

const socket = io.connect('http://localhost:5000')
export default function NotificationStack() {
  const [status, setStatus] = useState("")
  const [notiList, setNotiList] = useState([])
  useEffect(() => {
    socket.on("receive_request_custom_cage", (d) => {
      console.log(d);
      fetch("http://localhost:5000/api/v1/account/" + d.userId)
        .then(res => res.json())
        .then(data => {

          setNotiList([
            {
              firstName: data.data.customer[0].firstName,
              lastName: data.data.customer[0].lastName,
              phoneNumber: data.data.customer[0].account[0].phoneNumber
            }]
          )
          // setNotiList(prev => [...prev, {
          //   firstName: data.data.customer[0].firstName,
          //   lastName: data.data.customer[0].lastName,
          //   phoneNumber: data.data.customer[0].account[0].phoneNumber
          // }])
          // console.log(data)
        })

      // setStatus(d.status)
    })
  },
    [socket])

  useEffect(() => {
    document.title = `Dashboard (${notiList.length})`;
  }, [notiList])
  console.log(notiList);
  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        <span>
          <Badge badgeContent={notiList.length} color='error'>
            <NotificationsIcon color='action' />
          </Badge></span>

      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute  mt-5 flex w-screen max-w-max -translate-x-2/3 px-4">
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {notiList.length > 0 ? notiList.map((item, index) => (
                <div key={index} className="group items-center justify-center relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                  {/* <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                  </div> */}
                  <div>
                    <a href={item.href} className="font-semibold text-gray-900">
                      {item.firstName + " " + item.lastName + " " + item.phoneNumber}
                      <span className="absolute inset-0" />
                    </a>
                    <p className="mt-1 text-gray-600">Sent a request for custom page</p>
                  </div>
                </div>
              )

              ) : "Nothing..."}
            </div>

          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
