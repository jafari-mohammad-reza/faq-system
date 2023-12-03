-- Users Table
CREATE TABLE IF NOT EXISTS Users
(
    UserID   INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL
);

-- Roles Table
CREATE TABLE IF NOT EXISTS Roles
(
    RoleID INT AUTO_INCREMENT PRIMARY KEY,
    Title  VARCHAR(255) NOT NULL
);

-- UserRoles Junction Table for Many-to-Many Relationship between Users and Roles
CREATE TABLE IF NOT EXISTS UserRoles
(
    UserID INT NOT NULL,
    RoleID INT NOT NULL,
    PRIMARY KEY (UserID, RoleID),
    FOREIGN KEY (UserID) REFERENCES Users (UserID),
    FOREIGN KEY (RoleID) REFERENCES Roles (RoleID)
);

-- Sections Table
CREATE TABLE IF NOT EXISTS Sections
(
    SectionID   INT AUTO_INCREMENT PRIMARY KEY,
    SectionName VARCHAR(255) NOT NULL
);

-- Topics Table
CREATE TABLE IF NOT EXISTS Topics
(
    TopicID   INT AUTO_INCREMENT PRIMARY KEY,
    SectionID INT NOT NULL,
    FOREIGN KEY (SectionID) REFERENCES Sections (SectionID)
);

-- Questions Table
CREATE TABLE IF NOT EXISTS Questions
(
    QuestionID   INT AUTO_INCREMENT PRIMARY KEY,
    TopicID      INT  NOT NULL,
    UserID       INT  NOT NULL,
    QuestionText TEXT NOT NULL,
    FOREIGN KEY (TopicID) REFERENCES Topics (TopicID),
    FOREIGN KEY (UserID) REFERENCES Users (UserID)
);

-- Answers Table
CREATE TABLE IF NOT EXISTS Answers
(
    AnswerID   INT AUTO_INCREMENT PRIMARY KEY,
    QuestionID INT  NOT NULL,
    UserID     INT  NOT NULL,
    AnswerText TEXT NOT NULL,
    FOREIGN KEY (QuestionID) REFERENCES Questions (QuestionID),
    FOREIGN KEY (UserID) REFERENCES Users (UserID)
);

-- Views Table
CREATE TABLE IF NOT EXISTS Views
(
    ViewID     INT AUTO_INCREMENT PRIMARY KEY,
    UserID     INT NOT NULL,
    QuestionID INT,
    AnswerID   INT,
    FOREIGN KEY (UserID) REFERENCES Users (UserID),
    FOREIGN KEY (QuestionID) REFERENCES Questions (QuestionID),
    FOREIGN KEY (AnswerID) REFERENCES Answers (AnswerID),
    CHECK (QuestionID IS NOT NULL OR AnswerID IS NOT NULL)
);

-- Reactions Table
CREATE TABLE IF NOT EXISTS Reactions
(
    ReactionID INT AUTO_INCREMENT PRIMARY KEY,
    UserID     INT                      NOT NULL,
    QuestionID INT,
    AnswerID   INT,
    Type       ENUM ('Like', 'Dislike') NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users (UserID),
    FOREIGN KEY (QuestionID) REFERENCES Questions (QuestionID),
    FOREIGN KEY (AnswerID) REFERENCES Answers (AnswerID),
    CHECK (QuestionID IS NOT NULL OR AnswerID IS NOT NULL)
);
