import { useState } from 'react';
import Tabs from './Tabs';
import StarRating from './StarRating';
import Pagination from './Pagination';
import './style.css';

export default function ReusableComponents() {
  const [rating, setRating] = useState(3);
  const [page, setPage] = useState(5);

  return (
    <Tabs defaultValue="rating" className="reusable">
      <Tabs.List>
        <Tabs.Tab value="rating">Star rating</Tabs.Tab>
        <Tabs.Tab value="pages">Pagination</Tabs.Tab>
        <Tabs.Tab value="about">About</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="rating">
        <p>Controlled (value + onChange): {rating} stars</p>
        <StarRating value={rating} onChange={setRating} />
        <p>Uncontrolled (defaultValue):</p>
        <StarRating defaultValue={2} />
        <p>Read only:</p>
        <StarRating value={4} readOnly />
      </Tabs.Panel>

      <Tabs.Panel value="pages">
        <p>Page {page} of 20</p>
        <Pagination page={page} totalPages={20} onPageChange={setPage} />
      </Tabs.Panel>

      <Tabs.Panel value="about">
        <p>Use the arrow keys, Home and End to move between tabs.</p>
      </Tabs.Panel>
    </Tabs>
  );
}
