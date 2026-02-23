import Link from 'next/link';

import css from './SidebarNotes.module.css';

const TAGS = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

async function SidebarNotes() {
  return (
    <>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/all`} className={css.menuLink}>
            All notes
          </Link>
        </li>

        {TAGS.map(tag => (
          <li key={tag} className={css.menuItem}>
            <Link className={css.menuLink} href={`/notes/filter/${tag}`}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default SidebarNotes;
