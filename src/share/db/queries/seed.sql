DROP PROCEDURE IF EXISTS InsertDataIfNeeded;
CREATE PROCEDURE InsertDataIfNeeded()
BEGIN
    IF (SELECT COUNT(*) FROM User) = 0 THEN
        INSERT INTO User (Username , Password) VALUES ('User1' , '$2a$10$XbyVmySqE.xS3aQMtYfGiOH4hIv8bW.IEYxe2kUOVuhFHXIHat/r6') ,
                                                      ('User2' , '$2a$10$XbyVmySqE.xS3aQMtYfGiOH4hIv8bW.IEYxe2kUOVuhFHXIHat/r6'),
                                                      ('User3' , '$2a$10$XbyVmySqE.xS3aQMtYfGiOH4hIv8bW.IEYxe2kUOVuhFHXIHat/r6'),
                                                      ('User4' , '$2a$10$XbyVmySqE.xS3aQMtYfGiOH4hIv8bW.IEYxe2kUOVuhFHXIHat/r6'),
                                                      ('User5' , '$2a$10$XbyVmySqE.xS3aQMtYfGiOH4hIv8bW.IEYxe2kUOVuhFHXIHat/r6');
    END IF;
    IF (SELECT COUNT(*) FROM Role) = 0 THEN
        INSERT INTO Role (Title) VALUES ('ADMIN') , ('USER');
    END IF;
    IF (SELECT COUNT(*) FROM UserRole) = 0 THEN
        INSERT INTO UserRole (UserID, RoleID) VALUES (1, 1), (2, 2), (3, 2), (4, 2), (5, 2);
    END IF;
    IF (SELECT COUNT(*) FROM Section) = 0 THEN
        INSERT INTO Section (Name) VALUE ('Programming') , ('News');
    END IF;
    IF (SELECT COUNT(*) FROM Topic) = 0 THEN
        INSERT INTO Topic (Name ,SectionID) VALUE ('Golang' ,1 ) , ('Node.Js' ,1 ) , ('Backend' , 1) , ('Economy' , 2) , ('Politics' ,2);
    END IF;
END;
CALL InsertDataIfNeeded();

