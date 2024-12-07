import Link from 'next/link';
import style from './SideMenu.module.css';
import { FiHome } from 'react-icons/fi'; // Dashboard Icon
import { FaPenNib, FaList, FaUserEdit, FaTags } from 'react-icons/fa'; // Blog Management Icons
import { MdCategory, MdOutlineSupportAgent } from 'react-icons/md'; // Category & Support Icons
import { AiOutlineSetting } from 'react-icons/ai'; // Settings Icon

function SideMenu() {
    return (
        <div className={style.container}>
             <Link href="/" className={style.logo}>
                        <span style={{color: 'white'}}>Game</span>Grasper
                    </Link>
            <ul className={style.linkContainer}>
            
                <li>
                    <Link href="/admin">
                        <FiHome width={20} /> Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/admin/create">
                        <FaPenNib width={20} /> Create Blog
                    </Link>
                </li>
                <li>
                    <Link href="/admin/blogs">
                        <FaList width={20} /> Manage Blogs
                    </Link>
                </li>
                <li>
                    <Link href="/admin/categories">
                        <MdCategory width={20} /> Categories
                    </Link>
                </li>
                <li>
                    <Link href="/admin/tags">
                        <FaTags width={20} /> Tags
                    </Link>
                </li>
                <li>
                    <Link href="/admin/authors">
                        <FaUserEdit width={20} /> Authors
                    </Link>
                </li>
                <li>
                    <Link href="/admin/support">
                        <MdOutlineSupportAgent width={20} /> Support
                    </Link>
                </li>
                <li>
                    <Link href="/admin/settings">
                        <AiOutlineSetting width={20} /> Settings
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default SideMenu;
