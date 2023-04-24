import React from 'react'
import { IconType } from 'react-icons'

interface SidebarItemProps {
  label: string
  href?: string
  icon: IconType
  onCLick?: () => void
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onCLick,
}) => {
  return (
    <div className="flex flex-row items-center">
      <div
        className="
          relative
          rounded-full
          h-14
          w-14
          flex 
          items-center
          justify-center
          p-4
          hover:bg-slate-300
          hover:bg-opacity-10
          cursor-pointer
          lg:hidden
        "
      >
        <Icon size={20} color="white" />
      </div>
      <div
        className="
          relative
          hidden
          lg:flex
          items-row
          gap-4
          p-4
          rounded-full
          hover:bg-slate-300
          hover:bg-opacity-10
          cursor-pointer
        "
      >
        <Icon size={24} color="white" />
        <p className="text-white text-xl">{label}</p>
      </div>
    </div>
  )
}

export default SidebarItem
