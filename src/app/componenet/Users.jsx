'use client'

import { useEffect, useState, useRef } from "react";
import Card from "./Card";


const Users = () => {
  const [users, setUsers] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const observerRef = useRef();

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://tech-test.raintor.com/api/users/GetUsersList?take=10&skip=${skip}`
      );
      const data = await res.json();

      if (data.users.length > 0) {
        setUsers(prev => [...prev, ...data.users]);
        setSkip(prev => prev + data.users.length);
        if (users.length + data.users.length >= data.total) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError("Failed to load users.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchUsers();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
    // eslint-disable-next-line
  }, [hasMore, loading, skip]);

  return (
    <div className="grid grid-cols-2 gap-10">
      

      {users.map(user => (
        <Card key={user.id} user={user} />
      ))}

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!hasMore && <p>No more users to load.</p>}

      <div ref={observerRef} style={{ height: "1px" }}></div>
    </div>
  );
};

export default Users;
