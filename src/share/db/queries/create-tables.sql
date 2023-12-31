CREATE TABLE IF NOT EXISTS User
(
    ID       INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Role
(
    ID    INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS UserRole
(
    UserID INT NOT NULL,
    RoleID INT NOT NULL,
    PRIMARY KEY (UserID, RoleID),
    FOREIGN KEY (UserID) REFERENCES User (ID) ON DELETE CASCADE,
    FOREIGN KEY (RoleID) REFERENCES Role (ID) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS Section
(
    ID   INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Status  ENUM ('Draft', 'Published') NOT NULL
);


CREATE TABLE IF NOT EXISTS Topic
(
    ID        INT AUTO_INCREMENT PRIMARY KEY,
    Name      VARCHAR(255) NOT NULL,
    SectionID INT          NOT NULL,
    FOREIGN KEY (SectionID) REFERENCES Section (ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Question
(
    ID          INT AUTO_INCREMENT PRIMARY KEY,
    TopicID     INT          NOT NULL,
    UserID      INT          NOT NULL,
    Title       VARCHAR(255) NOT NULL,
    Description TEXT         NOT NULL,
    FOREIGN KEY (TopicID) REFERENCES Topic (ID) ON DELETE CASCADE,
    FOREIGN KEY (UserID) REFERENCES User (ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Answer
(
    ID         INT AUTO_INCREMENT PRIMARY KEY,
    QuestionID INT  NOT NULL,
    UserID     INT  NOT NULL,
    Text       TEXT NOT NULL,
    FOREIGN KEY (QuestionID) REFERENCES Question (ID) ON DELETE CASCADE,
    FOREIGN KEY (UserID) REFERENCES User (ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Views
(
    ViewID     INT AUTO_INCREMENT PRIMARY KEY,
    UserID     INT NOT NULL,
    QuestionID INT,
    AnswerID   INT,
    FOREIGN KEY (UserID) REFERENCES User (ID) ON DELETE CASCADE,
    FOREIGN KEY (QuestionID) REFERENCES Question (ID) ON DELETE CASCADE,
    FOREIGN KEY (AnswerID) REFERENCES Answer (ID) ON DELETE CASCADE,
    CHECK (QuestionID IS NOT NULL OR AnswerID IS NOT NULL)
);

CREATE TABLE IF NOT EXISTS Reactions
(
    ReactionID INT AUTO_INCREMENT PRIMARY KEY,
    UserID     INT                      NOT NULL,
    QuestionID INT,
    AnswerID   INT,
    Type       ENUM ('Like', 'Dislike') NOT NULL,
    FOREIGN KEY (UserID) REFERENCES User (ID) ON DELETE CASCADE,
    FOREIGN KEY (QuestionID) REFERENCES Question (ID) ON DELETE CASCADE,
    FOREIGN KEY (AnswerID) REFERENCES Answer (ID) ON DELETE CASCADE,
    CHECK (QuestionID IS NOT NULL OR AnswerID IS NOT NULL)
);