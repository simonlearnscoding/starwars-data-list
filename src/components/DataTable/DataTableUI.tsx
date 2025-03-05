import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '@/types';
import HighlightText from './HighlightText';

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

const TableCell: React.FC<TableCellProps> = ({ children, className = '' }) => (
  <td className={`p-4 text-sm text-gray-700 ${className}`}>{children}</td>
);

interface TableHeaderProps {
  children: React.ReactNode;
}

const TableHeader: React.FC<TableHeaderProps> = ({ children }) => (
  <th className="text-left text-xs uppercase text-gray-500 tracking-wider p-4">{children}</th>
);

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'height', label: 'Height' },
  { key: 'mass', label: 'Mass' },
  { key: 'created', label: 'Created' },
  { key: 'edited', label: 'Edited' },
  { key: 'homeworld', label: 'Planet' },
];

interface TableRowProps {
  person: Person;
  highlight?: string;
}

export const replacePlanetUrl = (url: string): string => {
  const swapiBase = 'https://swapi.dev/api/';
  const customBase = import.meta.env.VITE_CUSTOM_DOMAIN || 'http://localhost:5173';
  return url.startsWith(swapiBase) ? url.replace(swapiBase, customBase) : url;
};

const TableRow: React.FC<TableRowProps> = ({ person, highlight }) => (
  <tr className="hover:bg-gray-50">
    <TableCell>
      <HighlightText text={person.name} highlight={highlight || ''} />
    </TableCell>
    <TableCell>{person.height}</TableCell>
    <TableCell>{person.mass}</TableCell>
    <TableCell>{new Date(person.created).toLocaleDateString()}</TableCell>
    <TableCell>{new Date(person.edited).toLocaleDateString()}</TableCell>
    <TableCell>
      <Link
        to={'/planets/' + person.homeworld.split('/').filter(Boolean).pop()}
        className="text-blue-600 link hover:text-blue-800"
        rel="noopener noreferrer"
      >
        View Planet
      </Link>
    </TableCell>
  </tr>
);

const SkeletonRow = () => (
  <tr className="animate-pulse bg-gray-100">
    {columns.map((col) => (
      <TableCell key={col.key}>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </TableCell>
    ))}
  </tr>
);

interface PeopleTableProps {
  data: Person[];
  loadMoreRef: React.LegacyRef<HTMLTableRowElement>;
  isLoading: boolean;
  highlight?: string;
}

const DataTableUI: React.FC<PeopleTableProps> = ({ data, loadMoreRef, isLoading, highlight }) => {
  return (
    <div className="shadow-md">
      <div className="overflow-x-auto h-[680px] overflow-y-scroll">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-50 sticky top-0 z-5">
            <tr>
              {columns.map((column) => (
                <TableHeader key={column.key}>{column.label}</TableHeader>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y table-body divide-gray-200">
            {/* Skeleton Loading Placeholder */}
            {isLoading && data.length === 0 && (
              <>
                {[...Array(15)].map((_, index) => (
                  <SkeletonRow key={index} />
                ))}
              </>
            )}

            {/* No Results Found */}
            {!isLoading && data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="p-4 text-center text-gray-500">
                  No items match your query.
                </td>
              </tr>
            )}

            {/* Actual Data */}
            {data.map((person) => (
              <TableRow key={person.url} person={person} highlight={highlight} />
            ))}

            {/* Infinite Scroll Loading Indicator */}
            {isLoading && data.length > 0 && (
              <tr>
                <td colSpan={columns.length} className="p-4">
                  <div className="flex justify-center items-center w-full">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                  </div>
                </td>
              </tr>
            )}

            {/* Load More Trigger Element */}
            <tr ref={loadMoreRef}>
              <td colSpan={columns.length}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTableUI;
