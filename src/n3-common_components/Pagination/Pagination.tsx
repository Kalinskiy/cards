import React, {FC} from 'react';
import s from './Pagination.module.scss';
import {useSelector} from "react-redux";
import {AppStateType} from "../../n1-main/m2-bll/store";

interface PaginateProps {
    maxPage: number;
    onClickAction: (page: number) => void;
    page: number;
}

const ReactSimplePagination: FC<PaginateProps> = (props: PaginateProps) => {
    const pageState = useSelector<AppStateType, number | null>(state => state.table.page)

    const range = (start: number, end: number): number[] => {
        return Array.from({length: end - start + 1}, (v, k) => k + start)
    };
    const getPages = () => {
        const maxPage = props.maxPage || 5;
        const page = props.page || 1;
        if (maxPage > 0 && maxPage <= 5) {
            return range(1, maxPage)
        }
        if (page - 3 <= 0) {
            return range(1, 5)
        }
        const tmpPages: number[] = [];
        const iterater = [-2, -1, 0, 1, 2];
        iterater.forEach(i => {
            const tmpPage = page + i;
            if (tmpPage > maxPage) {
                return true
            }
            tmpPages.push(tmpPage)
        });

        return tmpPages
    };

    const pages = getPages();

    return (

            <div className={s.paginateArea}>
                <ul className={s.paginate}>
                    {(props.page > 1) && (
                        <li onClick={() => props.onClickAction(props.page - 1)}>
                            &lt;
                        </li>
                    )}
                    {pages.map(i => {
                        return (
                            <li
                                key={i}
                                className={pageState === i ? s.current : ''}
                                onClick={() => props.onClickAction(i)}
                            >
                                {i}
                            </li>
                        )
                    })}
                    {(props.page < props.maxPage) && (
                        <li onClick={() => props.onClickAction(props.page + 1)}>
                            &gt;
                        </li>
                    )}
                </ul>
            </div>

    )
};

export default ReactSimplePagination;