import React, {useState} from 'react';

const UsernameSearchInput = ({ usernames, setUsername }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsernames, setFilteredUsernames] = useState(usernames);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.length > 0) {
            const filtered = usernames.filter(username =>
                username.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredUsernames(filtered);
        } else {
            setFilteredUsernames(usernames);
        }
        setShowDropdown(true);
    };

    const handleSelectUsername = (username) => {
        setSearchTerm(username);
        setUsername(username);
        setShowDropdown(false);
    };

    return (
        <div className="username-search-container">
            <input
                type="text"
                value={searchTerm}
                placeholder="Enter username"
                onChange={handleInputChange}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />
            {showDropdown && filteredUsernames.length > 0 && (
                <ul className="dropdown-list">
                    {filteredUsernames.map((username, index) => (
                        <li key={index} onClick={() => handleSelectUsername(username)}>
                            {username}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UsernameSearchInput;